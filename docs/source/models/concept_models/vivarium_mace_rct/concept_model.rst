.. _2026_concept_model_vivarium_mace_rct:

===================
MACE RCT Simulation
===================

.. sectnum::
  :depth: 3

.. contents::
   :local:

.. list-table:: Definitions of terms and abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Term or Abbreviation
    - Definition
    - Note
  * - MACE
    - Major Adverse Cardiovascular Events
    - Composite outcome typically including cardiovascular death, myocardial infarction, and stroke
  * - LDL-C
    - Low Density Lipoprotein Cholesterol
    - Risk Factor
  * - RCT
    - Randomized Controlled Trial
    - Study design

Background
++++++++++

This concept model describes a simulation of a randomized controlled trial
(RCT) designed to reduce major adverse cardiovascular events (MACE) by
lowering LDL-C with an experimental new agent.

Modeling Aims and Objectives
++++++++++++++++++++++++++++

The aim of this simulation is to estimate the effect of the experimental
LDL-C-lowering agent on MACE incidence under trial conditions.

Concept Model Diagram
+++++++++++++++++++++

The concept model diagram will represent the trial population, the randomization
to treatment and control arms, LDL-C exposure, and downstream MACE outcomes.

Vivarium Modeling Components
++++++++++++++++++++++++++++

The simulation will include cause models for cardiovascular outcomes, a
risk exposure model for LDL-C, a risk effect linking LDL-C to MACE, and an
intervention model representing the experimental agent.

Back of the Envelope Calculations
+++++++++++++++++++++++++++++++++

Back of the envelope calculations to estimate the expected effect size and
required trial size will be added here.

Limitations
+++++++++++

Known limitations of the simulation, including assumptions about
adherence, response heterogeneity, and trial design simplifications, will
be documented here.

References
++++++++++

References supporting the model design and parameters will be listed here.
.. _2026_concept_model_vivarium_mace_rct:

===================
MACE RCT Simulation
===================

.. sectnum::
  :depth: 3

.. contents::
   :local:

.. list-table:: Definitions of terms and abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Term or Abbreviation
    - Definition
    - Note
  * - MACE
    - Major Adverse Cardiovascular Events
    - Composite outcome typically including cardiovascular death, myocardial infarction, and stroke
  * - LDL-C
    - Low Density Lipoprotein Cholesterol
    - Risk Factor
  * - RCT
    - Randomized Controlled Trial
    - Study design
  * - IHD
    - Ischemic Heart Disease
    - Cause of cardiovascular mortality
  * - NASH
    - Non-Alcoholic Steatohepatitis
    - Also referred to as MASH (metabolic dysfunction-associated steatohepatitis)
  * - MASLD
    - Metabolic dysfunction–Associated Steatotic Liver Disease
    - Spectrum of liver disease ranging from simple steatosis to MASH; a term gradually replacing NAFLD.  
  * - NAFLD
    - Non-Alcoholic Fatty Liver Disease
    - Spectrum of liver disease ranging from simple steatosis to NASH
  * - MASH
    - Metabolic Dysfunction-Associated Steatohepatitis
    - Updated nomenclature for NASH

Background
++++++++++

Elevated low-density lipoprotein cholesterol (LDL-C) is a well-established causal risk factor for
atherosclerotic cardiovascular disease, including ischemic heart disease (IHD) and ischemic stroke.
Despite the availability of statins and other
lipid-lowering therapies, a substantial fraction of patients at elevated cardiovascular risk do not
achieve guideline-recommended LDL-C targets, motivating the development of novel LDL-C-lowering
agents.

Non-alcoholic steatohepatitis (NASH), now more commonly referred to as metabolic dysfunction-associated
steatohepatitis (MASH), is an increasingly prevalent condition characterized by hepatic inflammation
and fibrosis in the setting of metabolic syndrome. Patients with NASH and significant liver fibrosis
carry a metabolic risk profile that differs from the general population in important ways: they have
higher rates of insulin resistance, dyslipidemia, obesity, and systemic inflammation. These
comorbidities place NASH patients at substantially elevated risk of cardiovascular events. Indeed,
cardiovascular disease is the leading cause of death in patients with non-alcoholic fatty liver
disease (NAFLD), surpassing liver-related mortality in all but the most advanced stages of fibrosis.

The randomized controlled trial (RCT) that this concept model simulates will enroll patients with a
to-be-determined level of liver fibrosis (e.g., fibrosis stage F2--F3) and elevated LDL-C. Because
this trial focuses on a population selected for hepatic fibrosis, the enrolled participants are
expected to have a metabolic risk profile that is meaningfully different from the general population.
In particular, they may have higher baseline rates of major adverse cardiovascular events (MACE)
due to the clustering of cardiometabolic
risk factors associated with NASH. Understanding these differences is critical for several reasons.

First, it is useful to understand what fraction of the general population would meet the trial's
inclusion criteria, as this determines the generalizability of the trial findings and the potential
market size for the intervention. 

Second, it is important to estimate how MACE rates in the trial population might differ from
general population rates. If the trial population has meaningfully higher baseline MACE risk, the
trial may be better powered to detect a treatment effect, but the absolute risk reduction observed
may not translate directly to lower-risk populations. Conversely, if the trial population
has lower baseline MACE risk, the trial may need to recruit an unexpectedly large sample
of study participants to be likely to detect the treatment effect.

This simulation will model the trial population, the randomization to treatment and control arms,
LDL-C trajectories under the experimental agent, and the downstream incidence of MACE
(cardiovascular death, myocardial infarction, and ischemic stroke) to inform trial design and
expected outcomes.

Modeling Aims and Objectives
++++++++++++++++++++++++++++

The aim of this simulation is to estimate the effect of the experimental
LDL-C-lowering agent on MACE incidence under trial conditions.

Concept Model Diagram
+++++++++++++++++++++

The concept model diagram will represent the trial population, the randomization
to treatment and control arms, LDL-C exposure, and downstream MACE outcomes.

Vivarium Modeling Components
++++++++++++++++++++++++++++

The simulation will include cause models for cardiovascular outcomes, a
risk exposure model for LDL-C, a risk effect linking LDL-C to MACE, and an
intervention model representing the experimental agent.

Back of the Envelope Calculations
+++++++++++++++++++++++++++++++++

Back of the envelope calculations to estimate the expected effect size and
required trial size will be added here.

Limitations
+++++++++++

Known limitations of the simulation, including assumptions about
adherence, response heterogeneity, and trial design simplifications, will
be documented here.

References
++++++++++

References supporting the model design and parameters will be listed here.
