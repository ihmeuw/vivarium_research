from vivarium.workflow import Workflow, ArtifactKey

from tutorial.constants.metadata import LOCATIONS

workflow = Workflow()

# We can use a loop over the locations (or other parameters) to avoid repeating the steps
# for each location.
# It is *not* necessary to pass the location explicitly to each step as an argument,
# nor to specify that artifact keys within this loop refer to a location-specific artifact.
for location in workflow.iterate(location=LOCATIONS):
    # We specify individual artifact **keys** needed by steps,
    # and can use a variable to avoid repeating the same list of keys for multiple steps.
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
        input=keys_needed_for_paf,
        model_specification='src/tutorial/data/custom_paf/paf_model_spec.yaml',
        branches_file='src/tutorial/data/custom_paf/scenarios.yaml',
        output=f'src/tutorial/data/custom_paf/results/{location}/',
        # These resource requests should be optional (have defaults) but can also be specified
        memory_gb=2,
        runtime='00:30:00',
    )

    workflow.python_step(
        # We specify the fully qualified function to run as a Python step.
        # This example would indicate a function called reformat_results,
        # in src/tutorial/data/custom_paf/reformat_results.py
        # The signature of the function would be:
        # def reformat_results(input: pd.DataFrame, location: str) -> pd.DataFrame:
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
        # There would no longer be a CSV for the remission rate
        # (as in the current practice section above) --
        # it would get saved directly into the artifact.
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

    # A test step will halt the workflow if the tests fail.
    # This one saves notebook output to a `executed` subdir for human inspection.
    workflow.test_notebooks_step(
        name='interactive sim V&V',
        # The input is the artifact keys, not the results, since interactive sim V&V
        # can run before the sim has been run.
        input=keys_needed_for_main_sim,
        notebooks='tests/interactive/*.ipynb',
        environment='simulation',
    )

    workflow.simulation_step(
        name='main sim',
        artifact_inputs=keys_needed_for_main_sim,
        model_specification='src/tutorial/model_specifications/model_spec.yaml',
        branches_file='src/tutorial/model_specifications/branches/scenarios.yaml',
        output=f'src/tutorial/results/{location}/',
        memory_gb=2,
        runtime='10:00:00',
    )

    # Another test step, this time using the simulation results.
    workflow.test_notebooks_step(
        name='results V&V',
        input=f'src/tutorial/results/{location}/',
        notebooks='tests/results/*.ipynb',
        environment='artifact',
    )

    workflow.notebook_step(
        'src/tutorial/results_processing/results_processing.ipynb',
        input=f'src/tutorial/results/{location}/',
    )


if __name__ == '__main__':
    workflow.main()