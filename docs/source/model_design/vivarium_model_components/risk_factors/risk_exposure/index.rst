..
  Section title decorators for this document:
  
  ==============
  Document Title
  ==============
  Section Level 1
  ---------------
  Section Level 2
  +++++++++++++++
  Section Level 3
  ~~~~~~~~~~~~~~~
  Section Level 4
  ^^^^^^^^^^^^^^^
  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _risk_exposure:

=================================
Risk exposure
=================================

.. contents::
  :local:

What is a risk exposure?
++++++++++++++++++++++++

A **risk exposure** is a quantification of the amount of risk present in a population or individual.

We will first consider a risk exposure in the context of an individual. An
exposure will have different possible measures which fall along a distribution,
and an individual will possess a specific measure within this distribution.

  For example, consider the exposure *systolic blood pressure*. SBP ranges
  from about 60 to 200, and any given individual will have a specific SBP measurement.

  One can also define categorical distributions. Consider, for example, the
  exposure *has worked in mining*. Here, we assign each individual either
  "yes" or "no".

Risk exposure distributions can be:

- Categorical

  - Dichotomous

  - Unordered polytomous

  - Ordered polytomous

- Continuous

Generally, risk exposure distributions should be mutually exclusive and collectively exhaustive.
In other words, the prevalence of all risk exposure categories for a categorical distribution and 
the risk exposure distribution's probability density function across all possible exposure values 
for a continuous distribution should sum to one.

See the table for examples of each of these risk exposure distributions. 

.. list-table:: Risk exposure distributions
  :header-rows: 1

  * - Distribution
    - Example
    - Possible exposure values
  * - Dichotomous
    - Zinc deficiency
    - * Not deficient
      * Deficient
  * - Unordered polytomous
    - Tobacco use
    - * None
      * Chewing tobacco
      * Cigarettes
      * Cigars
      * Other
      * Chewing tobacco AND cigarettes
      * Etc.
  * - Ordered polytomous
    - Child stunting
    - * No child stunting
      * Mild child stunting
      * Moderate child stunting
      * Severe child stunting
  * - Continuous
    - Systolic blood pressure
    - Any point value within possible systolic blood pressure range

After identifying an attribute of interest, the manner in which the risk
exposure is defined will be subject to the data access and the particular
research question the model is meant to answer. Major considerations include
the unit of analysis, the time frame of interest, data available, and sources of
bias within the data.

  For example, if the exposure is a one-time event with persistant effects, it
  can be defined as a dichotomous exposure. However, if the exposure is smoking
  as a risk for lung cancer, a continuous exposure defined with units of person-time
  such as pack years per individual will likely be more suitable.

As our models will typically use GBD estimates, some of the other typically
important considerations around data will have less broad applicability to our
models. However, we include these as notes. The exposure definition must
account for any gaps within the attribute of interest and the data available.

  For example, if one is interested in soda consumption, and is building a model
  based on data from soda sales in a certain region, this uncertainty needs to
  be  incorporated into the model. Similarly, researchers generally must be
  concerned  with biases from factors such as underreporting in the data.
  [Exposure_definition_and_measurement]_

Risk exposures in GBD
---------------------

GBD estimates pertain to the mid-year or yearly average measurements of
a population with a specific location, year, sex, and age, or an aggregation of
some such populations. Thus, in the context of GBD, a risk exposure is a
*distribution of individual exposure values* within a location-year-sex-age-
population.

If the exposure is dichotomous, for each location, sex, and year, GBD
will estimate a continuous age trend of the proportion of, say, individuals with
BMI over 30 kg/m\ :sup:`2`. If the exposure is continuous, then GBD estimates the distribution of the
exposure variable over the population in each age, sex, year, and location.

GBD's risk exposures will generally be less reliable than GBD cause-of-death
models, and when designing a risk exposure, it is important to both learn from
the GBD modeler what the entity captured by their exposure model is.

  Take, for example, the GBD exposure *has ever experienced
  intimate partner violence*. Barring incredibly high mortality rates among
  IPV victims, we would expect the proportion of the population that has ever
  experienced IPV to increase monotonically with age. However, survey data
  consistenly reports this proportion to peak among 30-40 year olds, which is
  refleced in the GBD model. We believe this phenomenon to be the result of
  recall bias. When implementing this in a model, however, if we were to
  initialize a population with dichotomous and persistent IPV exposure values
  from GBD estimates and then allow the simulants to age for 10 years, our
  exposure distribution would no longer match our reference data. Thus it
  becomes clear that the entity we're describing needs to be "recollection of
  IPV", "recent experience of IPV", or some other attribute that incorporates a
  time component.

While GBD estimates risk exposure during the modeling process, it does not publish
risk exposure estimates as part of its final results. Rather, GBD publishes estimates
of risk factor **summary exposure values (SEVs)**, which can be explored in the 
advanced options of GBD compare. The SEV is a measure of *risk-weighted prevalence* 
and is equal to zero when no excess risk exists for a population and equal to one 
when the entire population is at the highest level of risk. 

While the SEV can be useful for assessing trends in risk exposure over time or 
comparing risk exposures across demographic groups, it is less useful for our 
purposes. To obtain GBD estimated risk exposures, we must instead use 
:code:`get_draws()`. 

  Categorical risk exposures can typically be obtained using 
  :code:`source='exposure'` with a specified risk factor :code:`rei_id`. 

  Continuous risk exposures can be more complicated to obtain. Continous exposures in GBD 
  are typically estimated according to an 
  :ref:`ensemble distribution <vivarium_best_practices_ensemble_distributions>` and require data 
  the specifies the 1) mean, 2) variance, and 3) ensemble weights of the distribution. 
  Distribution mean and variance are typically estimated as modelable entities and can 
  be obtained using :code:`get_draws()` using :code:`source='epi'` with the specified 
  modelable entity IDs (ask the GBD modeler when in doubt for which one to use!). 
  Ensemble distribution weights for continuous risk exposures in GBD 2019 can be found 
  here: :code:`/ihme/epi/risk/ensemble/_weights/gbd_2019/`.

.. todo::

  Update file path to future GBD rounds when available.

.. note::

  Sometimes GBD estimates the underlying continuous distribution of a risk exposure and then 
  converts the risk exposure into a categorical distribution for use in downstream modeling 
  steps (this is done for child growth failure risk exposures, for example). Keep this in 
  mind in case the standard GBD risk exposure is categorical but you would prefer continuous 
  for your modeling purposes and ask the GBD modeler if this is the case.

Risk exposures in Vivarium
--------------------------

In Vivarium, each simulant will be assigned an exposure value. We will
typically derive these values from a population-level distribution provided by a
GBD risk exposure.

Any given attribute that we are interested in may be codified in a variety of
ways. The choices to make include which distribution to use, how to measure the
risk, and what time frame within which to consider the risk. We include some
examples below.

  Say we are modeling *BMI* as a risk exposure. BMI could be
  included as a continuous variable, or binned into {<20, 20-25,>25}. This
  decision will be based on the outcomes of interest and data availability.

  If we are interested in BMI as a risk for IHD, we might only be interested
  in current BMI. However, if we are modeling BMI as a risk for osteoporosis,
  it is possible that we will be interested in the cumulative history of
  BMI.

  Assume we are intersted in capturing *smoking* as a risk exposure. If the
  outcome of interest is lung cancer, we will be interested in a subject's
  full history of smoking. This might include:

  a) if the subject has ever been a regular smoker

  b) if so, with what frequency per week the subject smoked cigarettes

  c) the type of cigarettes smoked

  We could decide to encode these as a dichotomous variable (a), a categorical
  variable (b), and a second categorical variable (c), and include these as three
  different risk exposures in our model. This will necessitate some set of
  interactions that occur amongst the different exposures. Alternatively, we
  might define the risk exposure *smoking score*, which is a function of (a) (b)
  and (c), and which has some continuous or ordered categorical distribution.

Note that in each case our smoking model captures the same information, but in
the former we push the complexity of quantifying different types of smoking
histories to another part of the model, and in the former we wrap this
complexity into the exposure component.

Useful resources related to risk exposure models in Vivarium include:

* :ref:`Existing risk exposure modeling strategy documents <risk_exposure_models>`
* :ref:`The Vivarium risk exposure model document template <risk_exposure_model_template>`

Theoretical Minimum Risk Exposure Level/Distribution (TMREL/D)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The **theoretical minimum risk exposure level (TMREL)** is the level of risk
exposure that would minimize the risk of an adverse outcome for an individual.

For example, the TMREL for smoking would be "has never smoked." The
corresponding concept on the population level is the **theoretical minimum risk
exposure distribution (TMRED)**, which is the distribution of risk exposure that
would yield the lowest possible population risk. For smoking, the TMRED would be
the `degenerate probability distribution`_ assigning everyone in the population
to the TMREL category "has never smoked." [WHO-Global-Health-Risks-Annex]_,
[GBD-2017-Risk-Appendix-Modeling-Risk-Factors]_

.. _degenerate probability distribution: https://en.wikipedia.org/wiki/Degenerate_distribution

.. todo::

  Add formal mathematical definitions of TMREL and TMRED.

As discussed in the :ref:`causality section <causal_relationships>` of 
the causal diagrams page,
counterfactual analysis is used to describe the causal relationship between a
risk factor and an outcome. **The TMRED is a particular choice of counterfactual
exposure distribution** used for the causal attribution of disease burden to a
given risk factor in a population (see :ref:`Population Attributable Fraction <pafs>`). 
Other choices of counterfactual include the *plausible* minimum risk,
*feasible* minimum risk, and *cost-effective* minimum risk, each of which can
obviously depend on specific attributes of the population under consideration.
On the other hand, Murray et al. state in
[Comparative-quantification-health-risks-2003]_:

  "Biological principles as well as considerations of equity would necessitate
  that, **although the exposure distribution for theoretical minimum risk may
  depend on age and sex, it should in general be independent of geographical
  region or population.**"

However, the authors go on to add:

  "Exceptions to this are however unavoidable. An example would be the case of
  alcohol consumption, which in limited quantities and certain patterns, has
  beneficial effects on cardiovascular mortality, but is always harmful for
  other diseases such as cancers and accidents. In this case, the composition of
  the causes of death as well as drinking patterns in a region would determine
  the theoretical minimum distribution."

.. note::

  The above quote from [Comparative-quantification-health-risks-2003]_ is
  included to illustrate the subtleties in conceptualizing the TMREL as
  described by an original source advocating its use. **However, the description
  of the beneficial effects of alcohol is outdated**, as the latest research
  from `IHME <IHME alcohol study Lancet_>`_ and `Oxford <Oxford alcohol study
  preprint_>`_ shows that there is `no safe level of alcohol consumption`_.

  Based on more current research, here are some examples of risk factors with
  TMRELs that may depend on geography or population:

  - :ref:`Hemoglobin levels <2019_hemoglobin_anemia_and_iron_deficiency>` in
    the blood increase at high altitude, so the TMREL for hemoglobin
    concentration would be geography-dependent, with populations living at
    higher altitudes having a higher TMREL than those living at lower altitudes.
    GBD handles this situation not by explicitly defining different TMRELs, but
    rather by using altitude-adjusted hemoglobin data to estimate anemia
    prevalence.

  - High :ref:`Body Mass Index (BMI) <2019_risk_bmi>` is associated with
    increased risk of death in the general population, but it may be protective
    agianst some cancers and other chronic diseases (this phenomenon is termed
    the "`obseity paradox <obesity paradox cancer PubMed_>`_"). Thus, the
    optimal BMI (for minimizing overall risk) in a given population may depend
    on the leading causes of death or exposure to other risk factors in the
    population.

.. _IHME alcohol study Lancet: https://doi.org/10.1016/S0140-6736(18)31310-2

.. _Oxford alcohol study preprint: https://www.medrxiv.org/content/10.1101/2021.05.10.21256931v1

.. _no safe level of alcohol consumption: http://www.healthdata.org/news-release/new-scientific-study-no-safe-level-alcohol

.. _obesity paradox cancer PubMed: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5830139/

The smoking example `above <Theoretical Minimum Risk Exposure Level/Distribution
(TMREL/D)_>`_ illustrates two features of the TMREL that are typical of many
risk factors:

1. We imagine that everyone in the population has the same TMREL
2. The TMREL is *zero* or *no exposure*

However, neither of these conditions is necessary. In some cases, particularly
for continuous risk exposure variables, the TMREL may be a nonzero exposure
level. Moreover, there may be multiple TMRELs experienced by different members
of the population. For example, in GBD 2017 [GBD-2017-Risk-Appendix-Modeling-Risk-Factors]_:

1.  The TMREL for radon exposure is taken to be 10 `Bq
    <https://en.wikipedia.org/wiki/Becquerel>`_/m\ :superscript:`3`, which is
    equivalent to the average outdoor concentration of radon [ICRP]_.
2.  The :ref:`Low Birth Weight and Short Gestation <2017_risk_lbwsg>` risk
    factor has multiple TMREL categories since healthy babies have many
    different birth weights and gestational ages.

These examples illustrate some complexities in defining the TMREL and TMRED for
a given risk factor. For continuous risk exposure variables --- such as radon
exposure, or hemoglobin concentration, or systolic blood pressure --- it may be
impossible to define a single TMREL for the population, as we expect different
individuals to have different radon exposure levels or hemoglobin levels or
blood pressures, even in a theoretical population where risk is minimized. In
this case the TMRED will be a nontrivial probability distribution. For example,
a plausible TMRED for radon exposure would be some probability distribution of
positive radon exposure levels concentrated near the point 10 Bq/m\
:superscript:`3`. We will further discuss this point below.

.. todo::

  Add a more in-depth discussion of TMREDs for continuous exposure variables,
  based on systolic blood pressure example in [Estimating-Attributable-Burden]_.

  Also, say something about whether there should be different TMRELs for
  different risk-outcome pairs, and how GBD handles this.

  Add some discussion of issues brought up in `PR 153
  <https://github.com/ihmeuw/vivarium_research/pull/153>`_:

  - More in-depth description of counterfactual scenario, where one risk is set
    to the TMRED, but everything else is held constant, including exposure to
    other risk factors. Note that causally affected risk exposures would also
    change, as in the case of mediation (see BMI, SBP, mortality example in PR).

  - Mention approaches other than TMREL/D, e.g. No observed adverse effect
    level (NAOEL) and Lowest observed adverse effect level (LOAEL), and
    methods from cost-analysis.

  - Operationally, GBD only defines one TMRED for each risk factor, rather than
    one for each risk-outcome pair.

  - GBD assumes risks are monotonic (is that still true with splines in GBD
    2019+?), but this is not necessarily true (for example: BMI, sodium).

  - Clarify discussions of TMREL/D that depends on geography and/or biological
    features of the population, and of definitions of TMREL/D for population vs.
    individual (formal mathematical definitions should help with this).

  Fix broken links in citations [WHO-Global-Health-Risks-Annex]_ and
  [Estimating-Attributable-Burden]_.

References
----------

.. [Exposure_definition_and_measurement] Developing a Protocol for Observational Comparative Effectiveness Research: A User's Guide.Agency for Healthcare Research and Quality (US), Jan 2013
   Retrieved 11 March 2020.
   https://www.ncbi.nlm.nih.gov/books/NBK126190/
