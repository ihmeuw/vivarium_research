.. _2023_cause_heart_failure:

========================
Heart Failure: GBD 2023
========================

In the GBD, heart failure (HF) is an impairment, not a cause. Its nonfatal
burden is distributed across etiologic causes as a severity-graded sequelae.
Deaths coded to HF are considered "garbage codes" that are always due to some
underlying cause and are redistributed to the underlying cause. This page
documents a Vivarium cause model of heart failure built on GBD 2023
inputs. The model splits the HF impairment envelope into two states by
etiology — ischemic and non-ischemic — and overlays a continuous
ejection-fraction (EF) attribute drawn at HF onset, so that downstream
observers can classify events into HFrEF / HFmrEF / HFpEF phenotypes
with configurable cutoffs.

This model is a successor to the fused ischemic heart disease and
heart failure model documented at :ref:`2019_cause_ihd`. It inherits
that model's etiology-proportion machinery but differs in four ways:
(1) HF lives in its own standalone cause model rather than sharing a
state machine with IHD; (2) in a simulation that also models IHD, a
single optional coupling component both raises the ischemic HF hazard
for simulants with a history of myocardial infarction (leaving the
marginal rate unchanged) and nets the HF-due-to-IHD deaths out of the
IHD model's excess mortality (see
`The IHD-HF coupling component`_); (3) excess
mortality is derived from GBD's etiology-specific HF death space
rather than taken from the DisMod ME 2412 envelope EMR; and (4) the EF
phenotype overlay is new.

.. contents::
   :local:
   :depth: 1


.. list-table:: Abbreviations
   :widths: 15 25 30
   :header-rows: 1

   * - Abbreviation
     - Definition
     - Notes
   * - HF
     - Heart failure
     -
   * - EF / LVEF
     - (Left ventricular) ejection fraction
     - Fraction of blood pumped out of the left ventricle per beat
   * - HFrEF
     - Heart failure with reduced ejection fraction
     - LVEF :math:`\leq` 40%
   * - HFmrEF
     - Heart failure with mildly reduced ejection fraction
     - LVEF 41–49%
   * - HFpEF
     - Heart failure with preserved ejection fraction
     - LVEF :math:`\geq` 50%
   * - IHD
     - Ischemic heart disease
     -
   * - MI / AMI
     - (Acute) myocardial infarction
     -
   * - HHD
     - Hypertensive heart disease
     -
   * - CSMR
     - Cause-specific mortality rate
     -
   * - EMR
     - Excess mortality rate
     -
   * - BoP
     - Burden of proof
     - GBD's meta-regression framework for risk–outcome curves


Disease Overview
----------------

**Heart failure**

Heart failure is a condition in which the heart cannot pump enough
blood to meet the body's needs. In some cases the heart cannot fill
with enough blood; in others it cannot eject blood with enough force;
some people have both problems. Heart failure develops over time as
the heart's pumping action weakens, and it can affect one or both
sides of the heart. The leading causes are diseases that damage the
heart, including ischemic heart disease, high blood pressure,
and cardiomyopathies. Heart failure is a chronic, progressive
condition; while symptoms can be managed with medication, devices, and
lifestyle change, most patients experience recurring hospitalizations
and substantially elevated mortality. [NHLBI-HF]_ [AHA-HF]_

**Ejection-fraction phenotypes**

Clinically, heart failure is stratified by left ventricular ejection
fraction. Current consensus definitions [Bozkurt-2021]_ [ESC-2021]_
distinguish heart failure with reduced ejection fraction (HFrEF, LVEF
:math:`\leq` 40%), mildly reduced ejection fraction (HFmrEF, LVEF
41–49%), and preserved ejection fraction (HFpEF, LVEF :math:`\geq`
50%). The phenotypes differ systematically in etiology and
epidemiology:

- **HFrEF** is more often ischemic in origin (prior MI, coronary
  disease), skews male, and has historically been the target of most
  guideline-directed medical therapy.
- **HFpEF** is more often associated with hypertension, obesity,
  atrial fibrillation, and older age; it skews female, and
  its incident share rises steeply with age. In community cohorts
  roughly half of incident HF is HFpEF, and its share of hospitalized
  HF has been rising over time. [Ho-2016]_ [Gerber-2015]_
  [Steinberg-2012]_
- **HFmrEF** is intermediate on most characteristics and is retained
  here mainly so that analysis-time cutoffs can be varied.

Mortality after HF diagnosis is high for all phenotypes; meta-analytic
comparisons find modestly lower adjusted mortality in HFpEF than HFrEF
[MAGGIC-2012]_, while community cohorts find smaller differences
[Gerber-2015]_.

By including the LVEF in our model, we will be able to better
represent treatments that have differential efficacy for HFrEF and
HFpEF.


GBD 2023 Modeling Strategy
--------------------------

GBD 2023 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

**Case definition:**

Heart failure is diagnosed clinically using structured criteria such
as the Framingham [Framingham]_ or European Society of Cardiology
[Cardiology]_ criteria. Since GBD 2016, the case definition is ACC/AHA
Stage C and above, capturing both persons who are currently
symptomatic and those who have been diagnosed with heart failure but
are currently asymptomatic (e.g., well controlled on treatment). The
GBD case definition does not reference ejection fraction: the envelope
includes HFrEF, HFmrEF, and HFpEF without distinction.

**Input data:**

Literature data plus inpatient hospital and claims data inform the
overall heart failure envelope (modelable entity 2412). The etiology
machinery uses two further data streams, each for one specific
quantity: person-level vital registration data with causal-chain codes
(United States, Mexico, Brazil, Taiwan, Colombia) inform, for each
etiology, the fraction of its *underlying-cause* deaths that have HF
anywhere in the causal chain (:math:`\text{PropDeathsWithHF}_{e}`
below); and person-level hospital discharge data for Friuli Venezia
Giulia, Italy, linked to the region's death records, inform the excess
mortality of HF due to each etiology.

**Etiological fraction estimation:**

Four etiologies bypass the proportion framework entirely: HF due to
Chagas disease, degenerative mitral valve disease, and calcific aortic
valve disease is modeled within each parent cause, and HF following
acute stroke is set by a literature assumption that 5% of acute
strokes result in HF. All four are subtracted from the envelope before
the proportions below are estimated and applied — the scaled
proportions multiply the overall HF prevalence *excluding* these
etiologies [GBD-2023-NF]_.

For every other etiology, GBD estimates the prevalence of HF due to
that etiology through the epidemiological identity

.. math::
   \text{Prevalence}_{HF \text{ due to } e} =
   \frac{\text{CSMR}_{HF \text{ due to } e}}{\text{EMR}_{HF \text{ due to } e}}

where the etiology-specific HF CSMR is

.. math::
   \text{CSMR}_{HF \text{ due to } e} =
   \text{CSMR}_{e} \times \text{PropDeathsWithHF}_{e}

:math:`\text{CSMR}_{e}` is the post-CoDCorrect cause-specific
mortality of etiology :math:`e`, and
:math:`\text{PropDeathsWithHF}_{e}` is the modeled fraction of deaths
from etiology :math:`e` in which HF appears in the causal chain,
estimated in MR-BRT from person-level vital registration data. For
hypertensive heart disease, alcoholic cardiomyopathy, and other
cardiomyopathy the proportion is set to 1 (all deaths from these
causes involve HF). The etiology-specific EMR is estimated in MR-BRT
from the linked Friuli Venezia Giulia data; because deaths are sparse
at younger ages, EMR is assumed equal across etiologies for ages
under 45.

The resulting etiology-specific prevalences are divided by the overall
HF prevalence to give proportions, which are aggregated to seven
mutually exclusive and collectively exhaustive cause groupings:
coronary artery disease; pressure overload of the left heart; pressure
overload of the right heart; valve diseases; primary myocardial
diseases; toxins; and stress cardiomyopathies. These death-derived
proportions, together with literature data, inform DisMod-MR 2.1
proportion models (one per grouping, with country-level SEV
covariates), and the DisMod outputs are then scaled to sum to one —
the scaling happens after the DisMod modeling, not on the raw
quotients. In sub-Saharan Africa the death-derived proportions are
excluded in favor of published literature (the THESUS-HF study
[THESUS]_), because etiological patterns there differ from what death
data would imply. Sub-causes within each grouping are further split
proportionally.

Note that the seven groupings are the HF proportion-model taxonomy,
not GBD cause-list labels: coronary artery disease corresponds to the
IHD cause, pressure overload of the left heart to hypertensive heart
disease, pressure overload of the right heart to the cardiopulmonary
causes, and valve diseases cover rheumatic plus non-rheumatic valve
disease.

This model consumes those proportions with a two-way aggregation: the
coronary-artery-disease proportion defines the ischemic state, and the
other six groupings are aggregated into the non-ischemic state (see
`Model structure`_).

Severity splits and disability weights
++++++++++++++++++++++++++++++++++++++

The HF envelope is split into treated (controlled / medically
managed), mild, moderate, and severe severity levels. The disability
weights below are the GBD 2019 values; they have been stable across
recent rounds.

.. todo::
   Verify severity-split proportions and DW values against the GBD
   2023 YLD appendix.

.. list-table:: Severity levels for heart failure and associated disability weights
   :widths: 15 25 12
   :header-rows: 1

   * - Severity level
     - Lay description
     - DW (95% CI)
   * - Treated (controlled, medically managed)
     - Has been diagnosed with clinical heart failure, a chronic
       disease that requires medication every day and causes some
       worry but minimal interference with daily activities.
     - 0.049 (0.031–0.072)
   * - Mild
     - Is short of breath and easily tires with moderate physical
       activity, such as walking uphill or more than a quarter-mile on
       level ground. The person feels comfortable at rest or during
       activities requiring less effort.
     - 0.041 (0.026–0.062)
   * - Moderate
     - Is short of breath and easily tires with minimal physical
       activity, such as walking only a short distance. The person
       feels comfortable at rest but avoids moderate activity.
     - 0.072 (0.047–0.103)
   * - Severe
     - Is short of breath and feels tired when at rest. The person
       avoids any physical activity, for fear of worsening the
       breathing problems.
     - 0.179 (0.122–0.251)

Note that GBD severity levels are defined by symptoms, not by EF; the
EF attribute in this model (see `Ejection-fraction attribute`_) is
independent of the severity split, and disability weights are EF-blind
(see `Assumptions and Limitations`_).  TODO: INVESTIGATE IF THERE IS A KNOWN RELATIONSHIP BETWEEN EF AND SEVERITY

GBD 2023 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++

In GBD, heart failure is an impairment; deaths coded to heart failure
by the reporting organization are redistributed to the underlying
etiology as part of garbage-code redistribution [GBD-2023-CoD]_. No
estimates of mortality due to heart failure are produced by CODEm or
CoDCorrect. The quantity
:math:`\text{CSMR}_{HF \text{ due to } e}` defined above is, however,
produced as an intermediate of the etiology-fraction estimation, and
this model uses it as the death-space anchor for mortality accounting
(see `Excess mortality`_).

Because simulants in this model occupy HF states with an associated
EMR, the simulation produces deaths attributed to heart failure. This
has no direct GBD comparison and must be validated carefully (see
`Validation Criteria`_).

What GBD does not estimate
++++++++++++++++++++++++++

**No ejection-fraction axis.** No GBD quantity — envelope prevalence
or incidence, etiology proportions, severity splits, or mortality — is
resolved by ejection fraction. Every EF-related parameter in this
model therefore comes from the clinical and epidemiologic literature,
and the EF overlay is deliberately placed *downstream* of all
GBD-derived quantities so that GBD calibration is unaffected by it.

**The DisMod envelope EMR is not used.** DisMod-MR produces an EMR
for the HF envelope (modelable entity 2412) as part of fitting the
non-fatal model. This cause model does not use it; its excess
mortality is instead derived from the etiology-fraction pipeline's
death-space quantities (see `Excess mortality`_).

.. todo::
   [VOICE] The case against the ME 2412 EMR, in your words: what it is
   fit from, why its level and age pattern are not credible for a
   clinical HF cohort, and what you observed when it was used
   previously (the death inflation that motivated removing it in the
   consuming project).

Cause Hierarchy
+++++++++++++++

.. todo::
   Add ``cause_hierarchy_hf.svg``: the seven GBD proportion groupings
   (plus the four bypass etiologies) feeding the HF impairment
   envelope, with the ischemic / non-ischemic aggregation used by this
   model marked.

Restrictions
++++++++++++

The HF impairment envelope (ME 2412, ``rei_id`` 196) is estimated for
males and females across the full GBD age range, with etiology mix
varying strongly by age.

============================  =============================================
Sex                           Both (male and female estimated separately)
Age group start               Early Neonatal (``age_group_id`` 2)
Age group end                 95 plus (``age_group_id`` 235)
Measures published            Prevalence, YLDs
============================  =============================================

Heart failure is an impairment, not a cause, so the cause-level
YLL-only / YLD-only restriction flags do not apply. GBD publishes no
YLLs for the impairment: deaths coded to heart failure are
redistributed to the underlying cause of death, and heart failure
contributes YLDs only, attributed back to its etiologic causes.

Prevalence is non-zero in every age group from birth. In infancy the
envelope is dominated by congenital heart anomalies (76% at 1–5
months); ischemic and hypertensive heart disease together account for
55% by age 40–44 and 65% by age 85–89 [GBD-2023-NF]_.


Vivarium Modeling Strategy
--------------------------

Scope
+++++

.. todo::
   [VOICE] Narrative scope statement. Skeleton to react to:

   - Models first onset of clinical heart failure and subsequent
     excess mortality; does not model HF natural history (severity
     progression, remission, recurrent decompensation).
   - Splits the envelope by etiology (ischemic / non-ischemic) so that
     (a) mortality can differ by etiology using GBD's etiology-specific
     HF death space, and (b) MI history can act on ischemic entry
     through an optional effect component.
   - Overlays a continuous EF attribute at onset so observers can
     classify events into HFrEF / HFmrEF / HFpEF with configurable
     cutoffs; EF is a measurement overlay, not a state.
   - Complete on its own; a simulation that also models IHD adds a
     single optional coupling component that applies the MI-history
     effect and nets HF-due-to-IHD deaths out of the IHD model's EMR
     (below).
   - Relationship to :ref:`2019_cause_ihd`: inherits the
     etiology-proportion approach; departs by unfusing from the IHD
     state machine, deriving EMR from GBD death space instead of the
     envelope EMR, and adding the EF overlay.

Model structure
+++++++++++++++

The cause model has three states: susceptible (**S**), heart failure
of ischemic etiology (**HF_I**), and heart failure of non-ischemic
etiology (**HF_NI**). Both HF states are absorbing (no remission) and
mutually exclusive; a simulant's etiology is fixed at entry.

The envelope incidence and prevalence from ME 2412 are split by the
GBD etiology proportions, aggregated two ways from the seven-grouping
taxonomy (see `GBD 2023 Non-Fatal Modeling Strategy`_):

.. math::
   \text{prop}_I = \text{propHF}_{CAD}, \qquad
   \text{prop}_{NI} = 1 - \text{propHF}_{CAD}
   = \sum_{e \neq CAD} \text{propHF}_{e}

where CAD is the coronary-artery-disease grouping (the IHD share) and
the sum runs over the other six groupings (pressure overload of the
left heart; pressure overload of the right heart; valve diseases;
primary myocardial diseases; toxins; stress cardiomyopathies). The
per-grouping detail is retained in the artifact for mortality
accounting (see `Excess mortality`_) even though the state machine
aggregates them.

.. todo::
   The four bypass etiologies (Chagas, degenerative mitral valve
   disease, calcific aortic valve disease, HF after acute stroke) sit
   outside the seven-grouping proportions. Decide whether the
   non-ischemic state's prevalence and CSMR include them (their HF
   burden lives in the parent-cause models) or whether the envelope
   consumed here already excludes them; for a high-income application
   the valve diseases (DMVD/CAVD) are the materially nonzero ones.

The cause model itself never references MI history. In a simulation
that also models IHD, MI history acts on the HF_I incidence-rate
pipeline through the optional coupling component's MI-history effect
(see `Effect of MI history on ischemic HF incidence`_) whose PAF-style
renormalization holds the marginal HF_I incidence at the GBD-derived
split, so population-level calibration is identical with and without
the component.

Running standalone or alongside an IHD model
++++++++++++++++++++++++++++++++++++++++++++

This cause model is complete on its own: nothing in its states,
transitions, or data requires an IHD model to be present. Run
standalone, it reproduces the population-level behavior of the GBD
2019 model (:ref:`2019_cause_ihd`), in which HF-from-IHD was entered
at the population rate regardless of MI history.

A simulation that also models IHD adds exactly one thing: the
optional coupling component (see `The IHD-HF coupling component`_),
which makes two adjustments.

1. **The MI-history effect.** MI history is an individual-level
   determinant of ischemic HF, and it enters this model the same way
   any risk factor does: a modifier that multiplies the HF_I
   incidence-rate pipeline for exposed simulants (the exposure being
   the IHD model's MI-history attribute) and renormalizes so the
   marginal rate is unchanged. Because the effect is an ordinary
   pipeline modifier, leaving the component out of the model
   specification *is* the standalone behavior; the cause model itself
   is never configured differently.

2. **Death reassignment.** This model always owns HF-attributable
   deaths across the etiology groupings: its CSMR is
   :math:`\sum_e \text{CSMR}_{HF \text{ due to } e}`, deducted from
   the unmodeled-remainder mortality by the standard Vivarium
   accounting. GBD assigns HF deaths to their underlying causes, so an
   IHD model whose data were derived independently carries the
   HF-due-to-IHD deaths a second time. The coupling component
   subtracts them from the IHD model's chronic/post-MI
   excess-mortality pipeline at runtime and simultaneously splits the
   HF states' shared excess mortality by etiology, so that HF_I emits
   exactly the reassigned deaths (see
   `Reassigning HF-due-to-IHD deaths`_). The corresponding validation
   invariant: IHD-attributable deaths summed across the two models
   (IHD model states plus HF_I) match GBD's IHD CSMR (see
   `Validation Criteria`_).

Because all of these modifiers live in one component, the coupling is
all-or-nothing: a specification cannot adopt the incidence effect
while forgetting the death reassignment or vice versa. The remaining
misconfiguration — including both cause models but no coupling
component — double-counts HF-due-to-IHD deaths; the death-accounting
validation invariant is the tripwire for it.

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_hf.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 1 10 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\ usceptible
     - Simulant without clinical heart failure
   * - HF_I
     - **H**\ eart **F**\ ailure, **I**\ schemic
     - Simulant with clinical heart failure attributed to ischemic
       heart disease (GBD proportion grouping: coronary artery
       disease)
   * - HF_NI
     - **H**\ eart **F**\ ailure, **N**\ on-\ **I**\ schemic
     - Simulant with clinical heart failure attributed to any non-IHD
       etiology (aggregate of the six non-CAD proportion groupings)

States Data
"""""""""""

.. list-table:: State Data
   :widths: 5 10 20 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality rate
     - :math:`\sum_{e} \text{CSMR}_{HF \text{ due to } e}` summed over
       the etiology groupings, in every configuration
     - Death-space anchor; see `Excess mortality`_. When an IHD model
       runs alongside, the coupling component nets the ischemic term
       out of that model's EMR pipeline (see
       `The IHD-HF coupling component`_). Because the state EMRs are
       derived from this same quantity, prev × EMR equals this CSMR by
       construction; literature survival is a validation target
       instead of an input.
   * - S
     - prevalence
     - :math:`1 - \text{prevalence\_m2412}`
     -
   * - HF_I
     - prevalence
     - :math:`\text{prevalence\_m2412} \times \text{prop}_I`
     -
   * - HF_I
     - excess mortality rate
     - :math:`\text{EMR}_{HF}` (shared, prevalence-weighted); see
       `Excess mortality`_
     - The coupling component replaces this with the etiology-specific
       EMR (see `Reassigning HF-due-to-IHD deaths`_)
   * - HF_I
     - disability weight
     - prevalence-weighted blend of the HF-due-to-IHD severity
       sequelae DWs
     - As in :ref:`2019_cause_ihd`
   * - HF_NI
     - prevalence
     - :math:`\text{prevalence\_m2412} \times \text{prop}_{NI}`
     -
   * - HF_NI
     - excess mortality rate
     - :math:`\text{EMR}_{HF}` (shared, prevalence-weighted); see
       `Excess mortality`_
     - The coupling component replaces this with the etiology-specific
       EMR (see `Reassigning HF-due-to-IHD deaths`_)
   * - HF_NI
     - disability weight
     - prevalence-weighted blend of the non-IHD HF severity sequelae
       DWs
     -

Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 5 5 5 25 20
   :header-rows: 1

   * - Transition
     - Source
     - Sink
     - Value
     - Notes
   * - T1
     - S
     - HF_I
     - :math:`i_I(a,s) = \frac{\text{incidence\_m2412} \times
       \text{prop}_I}{1 - \text{prevalence\_m2412}}`
     - Susceptible-denominator rate. In a simulation that also models
       IHD, the optional MI-history effect modifies this pipeline; see
       `Effect of MI history on ischemic HF incidence`_
   * - T2
     - S
     - HF_NI
     - :math:`i_{NI}(a,s) = \frac{\text{incidence\_m2412} \times
       \text{prop}_{NI}}{1 - \text{prevalence\_m2412}}`
     - Susceptible-denominator rate; not conditioned on MI history

.. todo::
   Confirm the denominator convention against the consuming
   framework's rate-rescaling behavior (population-rate vs.
   susceptible-rate inputs) before implementation.

Data Sources
""""""""""""

.. list-table:: Data Sources and Definitions
   :widths: 12 12 25 25
   :header-rows: 1

   * - Variable
     - Source
     - Description
     - Notes
   * - prevalence_m2412
     - como
     - Prevalence of the HF impairment envelope
     -
   * - incidence_m2412
     - dismod-mr, como
     - Incidence of the HF impairment envelope
     -
   * - propHF_e (seven groupings)
     - CVD team / GBD etiology proportion models
     - Proportion of HF attributable to grouping :math:`e`, by
       age/sex/location, in the seven-grouping proportion taxonomy
     - GBD 2023 regeneration of the proportions file used in
       :ref:`2019_cause_ihd`
   * - CSMR_e
     - CoDCorrect
     - Cause-specific mortality of etiology :math:`e` (post
       CoDCorrect)
     -
   * - :math:`\text{CSMR}_{HF \text{ due to } e}`
     - CVD team (= CSMR_e :math:`\times` PropDeathsWithHF_e)
     - HF-attributable death rate per grouping
     - Drives the model CSMR and every derived EMR; see
       `Excess mortality`_
   * - PropDeathsWithHF_e
     - CVD team (MR-BRT)
     - Fraction of etiology-:math:`e` deaths with HF in the causal
       chain
     - Equals 1 for HHD and the cardiomyopathies
   * - HF severity sequela prevalences and DWs
     - como, YLD appendix
     - For the per-state blended disability weights
     -
   * - :math:`RR_{MI}`
     - literature
     - Hazard ratio for incident HF given prior MI
     - See `Effect of MI history on ischemic HF incidence`_
   * - EF class allocation parameters
     - literature
     - Multinomial model of incident EF class
     - See `Ejection-fraction attribute`_
   * - Within-class EF distributions
     - literature (registries)
     - Continuous EF draw given class
     - See `Ejection-fraction attribute`_
   * - Phenotype mortality contrast :math:`g(\text{EF})`
     - literature
     - EF-differential modifier on the state EMRs
     - See `Excess mortality`_

The IHD-HF coupling component
+++++++++++++++++++++++++++++

Everything a simulation must do differently because it models both IHD
and HF lives in this single optional component. It makes the two
adjustments specified below through pipeline modifiers; none requires
any change to either cause model's states, transitions, or artifact
data, so the same artifact runs standalone and coupled.

Effect of MI history on ischemic HF incidence
"""""""""""""""""""""""""""""""""""""""""""""

MI history is treated as a dichotomous risk factor for ischemic heart
failure, and this modifier is directly analogous to the categorical
risk effects documented elsewhere in this repository — it is risk-
effect machinery, not cause-model machinery. The component reads the
IHD model's MI-history attribute :math:`x \in \{0, 1\}` and registers
a multiplicative modifier on the HF_I incidence-rate pipeline:

.. math::
   \lambda_I(a, s, x) = i_I(a,s) \cdot
   (1 - \text{PAF}_{MI}(a,s)) \cdot RR_{MI}^{x},
   \qquad
   \text{PAF}_{MI}(a,s) =
   \frac{p_{MI}(a,s) \, (RR_{MI} - 1)}{p_{MI}(a,s) \, (RR_{MI} - 1) + 1}

where :math:`RR_{MI}` is the literature hazard ratio for incident HF
given prior MI and :math:`p_{MI}(a,s)` is the prevalence of MI history
among HF-susceptible simulants. This is the standard
risk-deleted-rate construction used by every risk effect: the expected
marginal hazard equals :math:`i_I(a,s)`, so population-level HF_I
incidence — and everything GBD-calibrated downstream of it — is
identical whether or not the component is included.

Implementing the coupling as a pipeline modifier rather than as
cause-model structure has three payoffs: the cause model stays a plain
two-transition disease model; the effect reuses the framework's
existing risk-effect machinery, including its PAF renormalization and
its mediation adjustments (see `Risk-effects interface`_); and the
standalone configuration needs no special casing — it is simply the
model specification without this component.

.. list-table:: MI-history effect parameters
   :widths: 10 15 25 25
   :header-rows: 1

   * - Parameter
     - Value (uncertainty)
     - Source
     - Notes
   * - :math:`RR_{MI}`
     - TBD
     - TBD — candidate anchors: post-MI registry cohorts
       [Jernberg-2015]_, trial placebo arms [VALIANT]_, community
       cohorts
     - Extraction pending; decide constant vs. stratified by age /
       sex / time since MI

.. todo::
   [LIT] Extract :math:`RR_{MI}` with uncertainty. Decide whether the
   literature supports stratifying by time since MI (early post-MI HF
   risk is front-loaded); if a constant is used, note the resulting
   limitation in `Assumptions and Limitations`_.

.. todo::
   Where :math:`p_{MI}(a,s)` — equivalently :math:`\text{PAF}_{MI}` —
   comes from: the framework's standard risk effects consume a
   build-time PAF from the artifact (computable here from GBD post-MI
   prevalence), whereas computing it from live state occupancy would
   stay self-consistent under intervention but needs a small framework
   extension. Decide and document the choice here, jointly with the
   denominator choice in the death reassignment below.

Reassigning HF-due-to-IHD deaths
""""""""""""""""""""""""""""""""

This model always owns HF-attributable deaths across the etiology
groupings (see `Running standalone or alongside an IHD model`_), and
GBD assigns those same HF-due-to-IHD deaths to the IHD cause, so an
IHD model whose EMR was derived from GBD data carries them a second
time. The coupling component moves those deaths from the IHD model
onto the HF_I state with a pair of modifiers that act as one
operation.

**Netting.** A subtractive modifier on the IHD model's chronic /
post-MI excess-mortality pipeline:

.. math::
   \text{EMR}^{net}_{chronic}(a,s) = \max\!\left(0, \;
   \text{EMR}_{chronic}(a,s) -
   \frac{\text{CSMR}_{HF \text{ due to } IHD}(a,s)}
        {\text{prevalence}_{chronic}(a,s)}\right)

**Etiology split of the HF excess mortality.** Without the coupling
component both HF states carry the shared prevalence-weighted EMR (see
`Excess mortality`_). The coupling component replaces it with the
etiology-specific pair

.. math::
   \text{EMR}_{HF\_I}(a,s) =
   \frac{\text{CSMR}_{HF \text{ due to } IHD}(a,s)}
        {\text{prevalence}_{HF\_I}(a,s)},
   \qquad
   \text{EMR}_{HF\_NI}(a,s) =
   \frac{\sum_{e \neq CAD} \text{CSMR}_{HF \text{ due to } e}(a,s)}
        {\text{prevalence}_{HF\_NI}(a,s)}

whose prevalence-weighted combination equals the shared EMR, so total
HF deaths are unchanged — only their attribution moves.

Together the two halves close the death accounting exactly: HF_I emits
:math:`\text{prevalence}_{HF\_I} \times \text{EMR}_{HF\_I} =
\text{CSMR}_{HF \text{ due to } IHD}` — precisely the deaths the
netting removed from the IHD model, with no reconciliation residual.
All inputs are artifact data, so the modifiers are deterministic given
the artifact. Unlike the MI-history effect, this operation is *not*
marginal-neutral for either cause — it deliberately moves deaths — and
the invariant it preserves is the cross-model one: IHD-attributable
deaths summed across the two models match GBD's IHD CSMR.

Placing the reassignment in the coupling component rather than in
either model's data derivation keeps the artifact
specification-independent (the same artifact data runs standalone or
coupled) and makes the coupling atomic: the incidence effect and the
death reassignment are adopted or omitted together.

.. todo::
   The subtraction can drive :math:`\text{EMR}^{net}_{chronic}`
   negative in strata where HF-due-to-IHD deaths exceed the chronic
   residual EMR — plausible at the oldest ages, where most IHD deaths
   involve HF. The floor at zero silently reassigns that shortfall to
   the HF_I state's mortality. Add a validation tripwire reporting how
   much death mass hits the floor, and revisit the IHD model's
   residual-EMR derivation if it is material.

.. todo::
   The prevalence denominator: artifact chronic-IHD prevalence
   (static, matching how the residual EMR was derived) vs. live state
   occupancy. Static is recommended for consistency; this is the same
   static-vs-live choice as :math:`\text{PAF}_{MI}` above — make the
   two choices together.

Ejection-fraction attribute
+++++++++++++++++++++++++++

EF is modeled as a **continuous attribute** assigned once, at entry
into either HF state (and at initialization for prevalent HF), via a
two-stage draw:

1. **Class allocation.** An EF class :math:`c \in \{\text{HFrEF},
   \text{HFmrEF}, \text{HFpEF}\}` is drawn from a multinomial logistic
   model conditioned on etiology (state entered), age, sex, and the
   metabolic covariates available in the simulation (e.g., BMI,
   fasting plasma glucose, systolic blood pressure). Covariate
   coefficients come from pooled community cohorts [Ho-2016]_; class
   intercepts are calibrated so the marginal incident class shares by
   age and sex match cohort and registry anchors [Gerber-2015]_
   [Steinberg-2012]_.
2. **Within-class EF draw.** Given the class, a continuous EF value is
   drawn from a registry-derived within-class distribution (e.g., a
   truncated distribution on the class's EF band with shape fit to
   hospitalized-HF registry histograms [Steinberg-2012]_).

Prevalent HF at initialization uses prevalent-population EF
distributions rather than incident ones, since differential survival
shifts the prevalent mix.

EF is fixed for the remainder of the simulant's life (no trajectory,
no post-treatment improvement — see `Assumptions and Limitations`_).
Classification into HFrEF / HFmrEF / HFpEF is applied by **observers
at analysis time** using configurable cutoffs (default 40 / 50), so
endpoint definitions and cutoff sensitivity analyses do not require
re-running the simulation.

The allocation stage is where phenotype-differential risk gradients
arise: because class probabilities depend on the metabolic covariates,
a covariate that raises total HF incidence (through the risk effects
on T1/T2) *and* tilts allocation toward HFpEF produces a steeper
marginal gradient for HFpEF than HFrEF — while the all-HF gradient is
preserved exactly (see `Risk-effects interface`_).

.. list-table:: EF attribute parameters (extraction pending)
   :widths: 15 20 25 25
   :header-rows: 1

   * - Parameter block
     - Form
     - Source
     - Notes
   * - Incident class allocation
     - multinomial logistic in etiology, age, sex, BMI, FPG, SBP
     - [Ho-2016]_ (pooled FHS / CHS / PREVEND / MESA); marginal shares
       from [Gerber-2015]_
     - TBD
   * - Within-class EF distributions
     - truncated distributions per class band
     - [Steinberg-2012]_ or comparable registry
     - TBD
   * - Prevalent-population EF distribution
     - as above, prevalent mix
     - registry / community cohort
     - TBD

.. todo::
   [LIT] Extract all three parameter blocks with uncertainty. Note
   that atrial fibrillation — a strong HFpEF predictor — is not in the
   consuming simulation's covariate set; its contribution is absorbed
   into the age/sex terms (list under `Assumptions and Limitations`_).

Excess mortality
++++++++++++++++

Neither the DisMod ME 2412 envelope EMR nor literature survival
supplies the excess mortality here (see `What GBD does not estimate`_
for the case against the envelope EMR). Instead, the state EMRs are
*derived* from GBD's death space through the same identity GBD itself
uses (:math:`\text{prevalence} = \text{CSMR} / \text{EMR}`): each
state's EMR is its HF-attributable CSMR divided by its prevalence.

Without the coupling component, both HF states carry the shared
prevalence-weighted EMR

.. math::
   \text{EMR}_{HF}(a,s) =
   \frac{\sum_e \text{CSMR}_{HF \text{ due to } e}(a,s)}
        {\text{prevalence\_m2412}(a,s)}

so total HF deaths equal
:math:`\sum_e \text{CSMR}_{HF \text{ due to } e}` — the model's CSMR —
identically, with no reconciliation residual. With the coupling
component, the shared EMR is replaced by the etiology-specific pair
(see `Reassigning HF-due-to-IHD deaths`_); the split preserves the
prevalence-weighted total, so the identity holds in every
configuration.

Literature survival — post-diagnosis mortality in community HF cohorts
[Gerber-2015]_ and the MAGGIC meta-analysis [MAGGIC-2012]_ — is
thereby freed to serve as an *external validation* target for the
derived EMRs rather than as a model input (see
`Validation Criteria`_).

.. todo::
   Confirm the extraction path for
   :math:`\text{CSMR}_{HF \text{ due to } e}`: it is an intermediate
   of the etiology-fraction pipeline (post-CoDCorrect
   :math:`\text{CSMR}_e \times \text{PropDeathsWithHF}_e`), so like
   the proportions it likely arrives as a CVD-team handoff rather
   than a central-machinery pull. Also decide how the four bypass
   etiologies' HF deaths (notably DMVD/CAVD) enter the sum — see the
   todo in `Model structure`_.

.. todo::
   The derived EMRs inherit the GBD assumptions upstream of them —
   the Friuli-linked-data EMR structure and the
   equal-EMR-across-etiologies assumption under age 45 — through the
   proportions. Keep these listed in `Assumptions and Limitations`_
   and check them against the survival validation anchors.

The EF phenotype modifies the state EMR multiplicatively via a
function :math:`g(\text{EF})` (or class-based hazard ratios),
renormalized within each state and age/sex stratum so the
etiology-level — and hence death-space — marginal is preserved:

.. math::
   \text{EMR}(a, s, \text{state}, \text{EF}) =
   \text{EMR}_{\text{state}}(a,s) \cdot
   \frac{g(\text{EF})}{E[\,g(\text{EF}) \mid \text{state}, a, s\,]}

.. list-table:: Mortality parameters
   :widths: 15 20 25 25
   :header-rows: 1

   * - Parameter
     - Form
     - Source
     - Notes
   * - :math:`\text{CSMR}_{HF \text{ due to } e}`
     - by age/sex, per grouping
     - GBD etiology-fraction pipeline (CVD team)
     - Drives the model CSMR and every derived EMR
   * - Phenotype contrast :math:`g(\text{EF})`
     - class HRs or smooth in EF
     - [MAGGIC-2012]_, [Gerber-2015]_
     - Renormalized to preserve etiology marginals; extraction pending
   * - Post-diagnosis survival anchors
     - survival curves by etiology and phenotype
     - [MAGGIC-2012]_, [Gerber-2015]_
     - Validation targets, not inputs

.. todo::
   [LIT] Extract :math:`g(\text{EF})` with uncertainty. Reconcile the
   MAGGIC (adjusted, HFpEF lower) vs. community-cohort (near-equal)
   phenotype contrast and pick which the model carries.

Risk-effects interface
++++++++++++++++++++++

Risk factors act on the **total** HF incidence — the sum of T1 and T2
before the etiology split — through the same risk-effect components
used elsewhere in the consuming simulation (see the SBP, BMI, and FPG
risk-effects documentation). The etiology split and the EF allocation
sit strictly *downstream* of the risk effects. Consequences:

- The all-HF exposure–incidence relationship (e.g., a burden-of-proof
  curve fit to all-HF outcomes) is recovered exactly as the marginal
  over etiology and phenotype, by construction. This is a required
  validation invariant.
- Phenotype-differential gradients emerge from the allocation stage
  (see `Ejection-fraction attribute`_) without requiring
  phenotype-specific absolute hazard curves, which are scarce in the
  literature.

**Design note — total vs. direct effects with the MI-history
component.** An all-HF risk–outcome curve estimated from cohort data
is a *total* effect: it includes the pathway running through interim
MI. When the coupling component is included, that pathway
also exists structurally in the simulation (risk :math:`\rightarrow`
MI :math:`\rightarrow` elevated HF_I hazard), so applying the full
total-effect curve as a direct effect double-counts the mediated
share. Because both pieces are ordinary risk-effect components, the
framework's existing mediated-risk-effect machinery is the natural
place to shave off the mediated share.

.. todo::
   [VOICE] Record the mediation decision: shave the MI-mediated share
   off the direct risk :math:`\rightarrow` HF effect (using the
   consuming framework's mediated-risk-effect machinery), accept the
   double count as small (quantify first), or ask the curve authors
   whether interim MI was adjusted for. This interacts with the
   MI-history effect's :math:`RR_{MI}` magnitude.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::
   [VOICE] Edit, cut, and re-rank this candidate list.

#. **No remission or recovery.** HF states are absorbing. GBD's
   DisMod model permits remission; clinically, some patients (notably
   HF with improved EF) leave Stage C symptomatology. The model will
   slightly overstate prevalent person-time at older ages.
#. **EF is fixed at onset.** No EF trajectory, deterioration, or
   treatment-driven improvement. Phenotype-switching over time
   (HFimpEF) is not represented; classification reflects EF at
   diagnosis, which matches how trial endpoints are typically
   adjudicated.
#. **A single incident event.** No recurrent HF hospitalizations. The
   model supports time-to-first-event endpoints; total-hospitalization
   or win-ratio analyses would require a hospitalization process on
   top of the prevalent state.
#. **Disability weights are EF-blind and severity-blended.** GBD
   severity splits are symptom-based; we do not vary DW by phenotype.
#. **Etiology proportions estimated in prevalence space are applied
   to incidence.** GBD's etiology fractions derive from prevalence
   (CSMR/EMR); applying them to incident events assumes the incident
   and prevalent etiology mixes agree up to the age/sex resolution of
   the proportions.
#. **Non-ischemic entry is independent of MI history**, and the five
   non-IHD groupings are aggregated into one state with one EMR.
#. **The MI-history hazard ratio is constant** (unless the extraction
   supports stratification), ignoring the front-loading of early
   post-MI HF risk.
#. **Atrial fibrillation is absent from the EF allocation covariates**
   (not modeled in the consuming simulation); its HFpEF association is
   absorbed by age and sex terms.
#. **The derived EMRs inherit GBD's etiology-fraction assumptions** —
   the EMR structure comes from linked data for one Italian region
   (Friuli Venezia Giulia), and EMR is assumed equal across etiologies
   under age 45 — and, like every GBD quantity here, they are
   general-population values applied to a possibly risk-enriched
   cohort.
#. **HF due to the four bypass etiologies** (Chagas, DMVD, CAVD, HF
   after acute stroke) sits outside the seven-grouping proportions;
   its treatment in this model's envelope and CSMR is an open decision
   (see the todo in `Model structure`_).
#. **Etiology is a label fixed at entry**, not re-adjudicated: a
   simulant who enters HF_NI and later has an MI remains in HF_NI.

Outputs and post-processing
+++++++++++++++++++++++++++

Observers record HF events with state (etiology), the continuous EF
value, and event time. Phenotype classification (HFrEF / HFmrEF /
HFpEF) is applied at analysis time with configurable cutoffs, enabling
EF-agnostic endpoints, phenotype-restricted endpoints (e.g.,
HFpEF-only hospitalization), and cutoff sensitivity analyses from a
single simulation run. Unlike the GBD 2019 model
(:ref:`2019_cause_ihd`), no post-processing split of the non-ischemic
state into sub-etiologies is planned; the per-grouping detail exists
in the artifact if a consuming project needs it.

Validation Criteria
+++++++++++++++++++

- Envelope: simulated all-HF incidence and prevalence match ME 2412 by
  age and sex.
- Etiology split: simulated HF_I share of incidence and prevalence
  matches :math:`\text{prop}_I` by age and sex.
- Death accounting (simulations that also model IHD): IHD-attributable
  deaths summed across the two models (IHD model states plus HF_I)
  match GBD's IHD CSMR; no HF-due-to-IHD death is counted twice.
- Risk-gradient invariant: the marginal all-HF exposure–incidence
  relationship recovers the input curve after the etiology and
  phenotype layers.
- Phenotype shares: incident HFpEF / HFmrEF / HFrEF shares by age and
  sex fall within cohort/registry ranges [Ho-2016]_ [Gerber-2015]_
  [Steinberg-2012]_.
- MI-history effect: cumulative incidence of HF among post-MI
  simulants matches registry anchors [Jernberg-2015]_ [VALIANT]_.
- Mortality: the death-space-derived EMRs imply post-diagnosis
  survival by etiology and phenotype consistent with [MAGGIC-2012]_ /
  [Gerber-2015]_ — an external validation, since literature survival
  is not an input; ACMR remains calibrated.

References
----------

.. [NHLBI-HF] Heart Failure. National Heart, Lung, and Blood
   Institute, U.S. Department of Health and Human Services.
   https://www.nhlbi.nih.gov/health/heart-failure

.. [AHA-HF] What is Heart Failure? American Heart Association.
   https://www.heart.org/en/health-topics/heart-failure/what-is-heart-failure

.. [Bozkurt-2021] Bozkurt B, Coats AJS, Tsutsui H, et al. Universal
   definition and classification of heart failure. J Card Fail.
   2021;27(4):387-413.

.. [ESC-2021] McDonagh TA, Metra M, Adamo M, et al. 2021 ESC
   Guidelines for the diagnosis and treatment of acute and chronic
   heart failure. Eur Heart J. 2021;42(36):3599-3726.

.. [Framingham] McKee PA, Castelli WP, McNamara PM, Kannel WB. The
   natural history of congestive heart failure: the Framingham study.
   N Engl J Med. 1971;285:1441-1446.

.. [Cardiology] Ponikowski P, et al. 2016 ESC Guidelines for the
   diagnosis and treatment of acute and chronic heart failure. Eur
   Heart J. 2016;37(27):2129-2200.

.. [Ho-2016] Ho JE, Enserro D, Brouwers FP, et al. Predicting heart
   failure with preserved and reduced ejection fraction: the
   international collaboration on heart failure subtypes. Circ Heart
   Fail. 2016;9(6):e003116.

.. [Gerber-2015] Gerber Y, Weston SA, Redfield MM, et al. A
   contemporary appraisal of the heart failure epidemic in Olmsted
   County, Minnesota, 2000 to 2010. JAMA Intern Med.
   2015;175(6):996-1004.

.. [Steinberg-2012] Steinberg BA, Zhao X, Heidenreich PA, et al.
   Trends in patients hospitalized with heart failure and preserved
   left ventricular ejection fraction: prevalence, therapies, and
   outcomes. Circulation. 2012;126(1):65-75.

.. [MAGGIC-2012] Meta-analysis Global Group in Chronic Heart Failure
   (MAGGIC). The survival of patients with heart failure with
   preserved or reduced left ventricular ejection fraction: an
   individual patient data meta-analysis. Eur Heart J.
   2012;33(14):1750-1757.

.. [Jernberg-2015] Jernberg T, Hasvold P, Henriksson M, Hjelm H,
   Thuresson M, Janzon M. Cardiovascular risk in post-myocardial
   infarction patients: nationwide real world data demonstrate the
   importance of a long-term perspective. Eur Heart J.
   2015;36(19):1163-1170.

.. [VALIANT] Velazquez EJ, Francis GS, Armstrong PW, et al. An
   international perspective on heart failure and left ventricular
   systolic dysfunction complicating myocardial infarction: the
   VALIANT registry. Eur Heart J. 2004;25(21):1911-1919.

.. [THESUS] Damasceno A, Mayosi BM, Sani M, et al. The causes,
   treatment, and outcome of acute heart failure in 1006 Africans
   from 9 countries: results of the sub-Saharan Africa survey of
   heart failure. Arch Intern Med. 2012;172(18):1386-1394.

.. [GBD-2023-NF] GBD 2023 Diseases, Injuries, and Risk Factors
   Collaborators. Burden of 375 diseases and injuries,
   risk-attributable burden of 88 risk factors, and healthy life
   expectancy in 204 countries and territories, including 660
   subnational locations, 1990-2023: a systematic analysis for the
   Global Burden of Disease Study 2023. Lancet. 2025; published online
   Oct 12. doi:10.1016/S0140-6736(25)01637-X. Supplementary appendix 1,
   "Heart failure impairment," pp. 645-660 (case definition, p. 648).

.. [GBD-2023-CoD] GBD 2023 Causes of Death Collaborators. Global burden
   of 292 causes of death in 204 countries and territories and 660
   subnational locations, 1990-2023: a systematic analysis for the
   Global Burden of Disease Study 2023. Lancet. 2025; published online
   Oct 12. doi:10.1016/S0140-6736(25)01917-8. Supplementary appendix 1,
   §3.7 Redistribution of garbage codes, pp. 20-21.