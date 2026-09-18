import gbd_mapping
import vivarium_public_health.population
import vivarium_public_health.risks
import vivarium_public_health.disease

components = [
    # Demographics
    vivarium_public_health.population.BasePopulation(),
    vivarium_public_health.population.Mortality(),
    vivarium_public_health.population.FertilityCrudeBirthRate(),
    # Cause
    vivarium_public_health.disease.SIS("diarrheal_diseases"),
    # Risk
    vivarium_public_health.risks.Risk("risk_factor.child_wasting"),
    # The effect of the risk on the cause
    vivarium_public_health.risks.effect.RiskEffect(
        "risk_factor.child_wasting",
        "cause.diarrheal_diseases.incidence_rate",
    ),
    # TODO: Cannot include mortality effect?!
    # vivarium_public_health.risks.effect.RiskEffect(
    #     "risk_factor.child_wasting",
    #     "cause.diarrheal_diseases.cause_specific_mortality_rate",
    # ),
]

import vivarium_public_health.results

components += [
    # Observers
    vivarium_public_health.results.DisabilityObserver(),
    vivarium_public_health.results.MortalityObserver(),
]

import pandas as pd

import vivarium
from vivarium import Component
from vivarium.framework.engine import Builder


class SQLNS(Component):
    columns_created = ["covered_by_sqlns", "would_benefit_from_sqlns"]

    # This special method, setup, runs once when the simulation is being set up,
    # before any time has passed in the simulation.
    def setup(self, builder: Builder) -> None:
        # Get the desired coverage level from the configuration.
        self.coverage = builder.configuration["sqlns"]["coverage"]
        # Create a random number generator for this component.
        self.randomness = builder.randomness.get_stream("sqlns")
        builder.value.register_value_modifier(
            "child_wasting.exposure",
            modifier=self.intervention_effect,
            requires_columns=[
                "covered_by_sqlns",
                "would_benefit_from_sqlns",
            ],
        )

    def on_initialize_simulants(
        self, pop_data: vivarium.framework.population.SimulantData
    ) -> None:
        # pop_data is information about the simulants being initialized.
        # We use it to create new columns in the population data frame.
        covered_by_sqlns = pd.Series(
            # get_draw draws a random number from the uniform distribution between 0 and 1
            # for each simulant.
            self.randomness.get_draw(
                pop_data.index,
                # NOTE: It is important that we provide additional keys here, as otherwise
                # our two calls to get_draw will return the same results!
                additional_key="covered_by_sqlns",
            )
            <= self.coverage,
            name="covered_by_sqlns",
        )
        would_benefit_from_sqlns = pd.Series(
            # 13% of those who receive SQLNS and are wasted benefit from it,
            # in that they become no longer wasted, so we label 13% of the population as
            # potentially benefiting from it.
            # Of course, only these people who also are wasted and receive SQLNS
            # will actually have the benefit.
            self.randomness.get_draw(
                pop_data.index,
                additional_key="would_benefit_from_sqlns",
            )
            <= 0.13,
            name="would_benefit_from_sqlns",
        )
        self.population_view.update(
            covered_by_sqlns.to_frame().join(would_benefit_from_sqlns)
        )

    def intervention_effect(
        self, index: pd.Index, child_wasting: pd.Series
    ) -> pd.Series:
        # Here, 'index' is the index of the data frame that is being modified.
        # 'child_wasting' is a series containing the child wasting values before modification.

        # First, we map child wasting to more readable categories.
        category_mapping = gbd_mapping.risk_factors.child_wasting.categories.to_dict()
        assert child_wasting.isin(category_mapping.keys()).all()
        child_wasting = child_wasting.map(category_mapping)

        pop = self.population_view.get(index)

        baseline_wasting_moderate_severe = child_wasting[index].isin(
            [
                "Wasting Between -3 SD and -2 SD (post-ensemble)",
                "Severe Wasting, < -3 SD (post-ensemble)",
            ]
        )
        # Change those who benefit and are moderately or severely wasted to the mild category.
        child_wasting.loc[
            index[
                baseline_wasting_moderate_severe
                & pop.covered_by_sqlns
                & pop.would_benefit_from_sqlns
            ]
        ] = "Wasting Between -2 SD and -1 SD (post-ensemble)"

        # Map back to the original unreadable categories.
        return child_wasting.map({v: k for k, v in category_mapping.items()})

components += [
    SQLNS(),
]

configuration = {}

configuration["input_data"] = {
    "artifact_path": "tutorial.hdf",
    "input_draw_number": 0,
}

configuration["time"] = {
    # step_size is the timestep in days
    "step_size": 7,
    "start": {
        "year": 2025,
        "month": 1,
        "day": 1,
    },
    "end": {
        "year": 2030,
        "month": 12,
        "day": 31,
    },
}

configuration["population"] = {
    "initialization_age_min": 0,
    "initialization_age_max": 2,
    "population_size": 500_000,
    # HACK: Need all of these for now.
    "untracking_age": 2,
    "age_end": 2,
    "exit_age": 2,
}

import copy

sim_baseline = vivarium.InteractiveContext(
    components=copy.deepcopy(components),
    configuration={
        "sqlns": {
            "coverage": 0,
        },
        **configuration,
    },
)

sim_intervention = vivarium.InteractiveContext(
    components=copy.deepcopy(components),
    configuration={
        "sqlns": {
            "coverage": 1,  # 100% coverage
        },
        **configuration,
    },
)

for _ in range(5):
    sim_baseline.step()
    sim_intervention.step()

# sim_baseline.run()
# sim_intervention.run()