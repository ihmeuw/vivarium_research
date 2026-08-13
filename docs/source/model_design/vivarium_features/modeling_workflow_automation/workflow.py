from vivarium.workflow import Workflow, ArtifactKey

from vivarium.gbd_mapping import causes, risk_factors, covariates

from tutorial.constants.metadata import LOCATIONS, NUM_DRAWS, GBD_DATA_YEAR

workflow = Workflow()

# In addition to iterating over the values, `iterate` adds the specified parameter
# as an argument to every step that is appended to the workflow within the loop,
# and automatically scopes ArtifactKeys to the specified location.
for location in workflow.iterate(location=LOCATIONS):
    keys_needed_for_paf = [
        # Loaded using the functions in loader.py
        ArtifactKey('population.structure'),
        ArtifactKey('population.demographic_dimensions'),
        ArtifactKey('cause.diarrheal_diseases.prevalence'),
        ArtifactKey('cause.diarrheal_diseases.restrictions'),
        ArtifactKey('risk_factor.child_wasting.exposure'),
        ArtifactKey('risk_factor.child_wasting.relative_risk'),
        ArtifactKey('risk_factor.child_wasting.distribution'),
    ]

    workflow.simulation_step(
        name='PAF sim',
        # The following line *automatically* makes an artifact with only the specified keys
        input=keys_needed_for_paf,
        model_specification='src/tutorial/data/custom_paf/paf_model_spec.yaml',
        output=f'src/tutorial/data/custom_paf/results/{location}/',
        input_draw_count=NUM_DRAWS,
        random_seed_count=10,
        # These resource requests would also have defaults
        memory_gb=2,
        runtime='00:30:00',
    )

    # In src/tutorial/custom_paf/reformat_results.py:
    # def reformat_results(input: pd.DataFrame) -> pd.DataFrame:
    #     ...
    workflow.python_step(
        'tutorial.data.custom_paf.reformat_results.reformat_results',
        input=f'src/tutorial/data/custom_paf/results/{location}/paf_observer.parquet',
        # The dataframe returned gets automatically saved into the artifact at this key.
        # There would *not* be a function in loader.py for this key.
        output=ArtifactKey('risk_factor.child_wasting.population_attributable_fraction'),
        # Python steps have some default resources, but you could also override them here
    )

    workflow.python_step(
        'tutorial.data.custom_remission.custom_remission.custom_remission',
        input=ArtifactKey('risk_factor.child_wasting.population_attributable_fraction'),
        # There would no longer be a CSV for the remission rate -- it would get saved
        # directly into the artifact.
        output=ArtifactKey('cause.diarrheal_disease.remission_rate'),
    )

    keys_needed_for_main_sim = keys_needed_for_paf + [
        # More GBD keys
        ArtifactKey('population.theoretical_minimum_risk_life_expectancy'),
        ArtifactKey('cause.all_causes.cause_specific_mortality_rate'),
        ArtifactKey('covariate.live_births_by_sex.estimate'),
        ArtifactKey('cause.diarrheal_diseases.incidence_rate'),
        ArtifactKey('cause.diarrheal_diseases.cause_specific_mortality_rate'),
        ArtifactKey('cause.diarrheal_diseases.disability_weight'),
        ArtifactKey('cause.diarrheal_diseases.excess_mortality_rate'),
        # Custom keys
        ArtifactKey('risk_factor.child_wasting.population_attributable_fraction'),
        ArtifactKey('cause.diarrheal_disease.remission_rate'),
    ]

    # This **automatically** makes all workflow steps that depend on a superset of its
    # inputs gate on whether these ran successfully.
    # Saves notebook output to a `executed` subdir.
    workflow.test_notebooks_step(
        name='interactive sim V&V',
        input=keys_needed_for_main_sim,
        notebooks='tests/interactive/*.ipynb',
        environment='simulation',
    )

    workflow.simulation_step(
        name='main sim',
        artifact_inputs=keys_needed_for_main_sim,
        # artifact_path=f'src/tutorial/artifacts/{location}.hdf',
        model_specification='src/tutorial/model_specifications/model_spec.yaml',
        output=f'src/tutorial/results/{location}/',
        input_draw_count=NUM_DRAWS,
        random_seed_count=10,
        scenarios=[
            'baseline',
            'sqlns_scaleup',
        ],
        memory_gb=2,
        runtime='10:00:00',
    )

    workflow.test_notebooks_step(
        name='results V&V',
        input=f'src/tutorial/results/{location}/',
        notebooks='tests/results/*.ipynb',
        environment='artifact',
    )

    # Automatically saves executed notebook to an `executed` subdir.
    workflow.notebook_step(
        'src/tutorial/results_processing/results_processing.ipynb',
        input=f'src/tutorial/results/{location}/',
    )


if __name__ == '__main__':
    workflow.main()