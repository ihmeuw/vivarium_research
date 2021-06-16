.. _2019_risk_effect_lbwsg:

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
  ^^^^^^^^^^^^^^^

  Section Level 4
  ~~~~~~~~~~~~~~~

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

================================================
Low Birthweight and Short Gestation Risk Effects
================================================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

.. todo::

	Provide a brief description of the risk, including potential opportunities for confounding (factors that may cause or be associated with the risk exposure), effect modification/generalizability, etc. by any relevant variables. Note that literature reviews and speaking with the GBD risk modeler will be good resources for this.

GBD 2019 Modeling Strategy
--------------------------

.. note::

   This section will describe the GBD modeling strategy for risk effects.
   For a description of GBD modeling strategy for risk exposure, see the
   {RISK_EXPOSURE_PAGE_LINK} page.

.. todo::

   Replace {RISK_EXPOSURE_PAGE_LINK} with a reference to the appropriate risk
   exposure page in the above note.


**The available data for deriving relative risk was only for all-cause
mortality.**
For each location, data were pooled across years, and the risk of all-cause
mortality at the **early neonatal period** and **late neonatal period** at joint
birthweight and gestational age combinations was calculated. In all datasets
except for the USA, sex-specific data were combined to maximise sample size. The
USA analyses were sex-specific.
**Relative risks of all-cause mortality were calculated for each 500g and 2wk
category of birthweight and gestational age.**
[GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

.. note::

  The risk appendix's description of 2-week age bins is not totally accurate
  --- there are two exceptions:

  - 2 of the 58 categories (cat2 and cat8) have an age range of 0-24 weeks.

  - 14 of the 58 categories have a 1-week age range, either 36-37 weeks or 37-38
    weeks, because 37 weeks is the usual cutoff for defining preterm birth.

  For simplicity, we will generally refer to "500g and 2wk categories," with
  the understanding that there are some exceptions.

Details of Relative Risk Estimation
+++++++++++++++++++++++++++++++++++

In the Norway, New Zealand, and USA Linked Birth/Death Cohort microdata
datasets, livebirths are reported with gestational age, birthweight, and an
indicator of death at 7 days and 28 days. For this analysis, gestational age was
grouped into two-week categories, and birthweight was grouped into 500-gram
categories. The Taiwan, Japan, and Singapore datasets were prepared in
tabulations of joint 500-gram and two-week categories. A pooled country analysis
of mortality risk in the early neonatal period and late neonatal period by
“small for gestational age” category in developing countries in Asia and
sub-Saharan Africa were also used to inform the relative risk analysis.

To calculate relative risk at each 500-gram and two-week combination, logistic
regression was first used to calculate mortality odds for each joint two-week
gestational age and 500-gram birthweight category. Mortality odds were smoothed
with Gaussian process regression, with the independent distributions of
mortality odds by birthweight and mortality odds by gestational age serving as
priors in the regression. A pooled country analysis of mortality risk in the
early neonatal period and late neonatal period by SGA category in developing
countries in Asia and sub-Saharan Africa were also converted into 500-gram and
two-week bin mortality odds surfaces.

The relative risk surfaces produced from microdata and the Asia and Africa
surfaces produced from the pooled country analysis were meta-analysed, resulting
in a meta- analysed mortality odds surface for each location. The meta-analysed
mortality odds surface for each location was smoothed using Gaussian process
regression and then converted into mortality risk.

To calculate mortality relative risks, the risk of each joint two-week
gestational age and 500-gram birthweight category were divided by the risk of
mortality in the joint gestational age and birthweight category with the lowest
mortality risk. [GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

.. note::

  Although the above description from the GBD 2019 risk appendix sometimes
  refers to location-specific mortality risks, the relative risks in GBD 2019
  are the same for all locations. Pulling LBWSG RR's with ``get_draws`` for any
  location returns RR's with location_id = 1 (Global), and they are stratified
  by year/age_group/sex. If we need clarification on exactly how the relative
  risks were calculated, we should consult the GBD modelers.

Affected Outcomes in GBD 2019
+++++++++++++++++++++++++++++

The available data for deriving relative risk was only for *all-cause mortality*
rather than for cause-specific outcomes. The exception was the USA linked infant
birth-death cohort data, which contained three-digit ICD causes of death, but
also had nearly 30% of deaths coded to causes that are ill-defined, or
intermediate, in the GBD cause classification system.

Therefore, the GBD modelers analysed the relative risk of all-cause mortality
across all available sources and selected outcomes based on criteria of
biological plausibility. **Some causes, most notably congenital birth defects,
haemoglobinopathies, malaria, and HIV/AIDS, were excluded based on the criteria
that reverse causality could not be excluded.**
[GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

.. list-table:: Entities Affected by LBWSG in GBD 2019
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Diarrheal diseases
     - Cause
     - 302
     - Mortality (GBD YLLs)
     -
   * - Lower respiratory infections
     - Cause
     - 322
     - Mortality (GBD YLLs)
     -
   * - Upper respiratory infections
     - Cause
     - 328
     - Mortality (GBD YLLs)
     -
   * - Otitis media
     - Cause
     - 329
     - Mortality (GBD YLLs)
     -
   * - Meningitis
     - Cause
     - 332
     - Mortality (GBD YLLs)
     -
   * - Encephalitis
     - Cause
     - 337
     - Mortality (GBD YLLs)
     -
   * - Neonatal preterm birth
     - Cause (PAF-of-1)
     - 381
     - Mortality and Morbidity (GBD YLLs and YLDs)
     - 100% attributable to Low birthweight and short gestation
   * - Neonatal encephalopathy due to birth asphyxia and trauma
     - Cause
     - 382
     - Mortality (GBD YLLs)
     -
   * - Neonatal sepsis and other neonatal infections
     - Cause
     - 383
     - Mortality (GBD YLLs)
     -
   * - Hemolytic disease and other neonatal jaundice
     - Cause
     - 384
     - Mortality (GBD YLLs)
     -
   * - Other neonatal disorders
     - Cause
     - 385
     - Mortality (GBD YLLs)
     -
   * - Sudden infant death syndrome
     - Cause
     - 686
     - Mortality (GBD YLLs)
     -

.. note::

  There are 12 causes affected by LBWSG in GBD 2019, whereas GBD 2017 included
  15 affected causes. The only difference is that meningitis (c332) had four
  subcauses in GBD 2017 (c333, c334, c335, c336, corresponding to different
  etiologies), whereas in GBD 2019, c332 is the most detailed cause, and the
  subcauses have been removed.

Restrictions
++++++++++++

.. list-table:: Age, Sex, and Outcome Restrictions for LBWSG Relative Risks in GBD 2019
  :widths: 15 15 20
  :header-rows: 1

  * - Restriction Type
    - Value
    - Notes
  * - Male only
    - False
    -
  * - Female only
    - False
    -
  * - YLL only
    - True
    - Except for Neonatal preterm birth; see :ref:`note <note_on_preterm_birth_DALYs>` below
  * - YLD only
    - False
    -
  * - Age group start
    - Early neonatal (0-7 days, age_group_id = 2)
    -
  * - Age group end
    - Late neonatal (7-28 days, age_group_id = 3)
    - Except for Neonatal preterm birth; see :ref:`note <note_on_preterm_birth_DALYs>` below

.. _note_on_preterm_birth_DALYs:

.. note::

  GBD attributes 100% of the DALYs due to Neonatal Preterm Birth to the LBWSG
  risk factor. In particular, the attribution includes YLDs as well as YLLs, and
  the age restrictions for the LBWSG-attributable DALYs are the same as the age
  restrictions for Neonatal Preterm Birth.

  * **YLLs due to Neonatal preterm birth**, 100% attributable to LBWSG:

    - Age group start = 2 (Early neonatal, 0-7 days)
    - Age group end = 5 (1 to 4)

  * **YLDs due to Neonatal preterm birth**, 100% attributable to LBWSG:

    - Age group start = 2 (Early neonatal, 0-7 days)
    - Age group end = 235 (95+)

  Note that this attribution of DALYs is **not** based on the relative risks for
  all-cause mortality, but instead is based on the logic that all preterm births
  are due to short gestation by definition. Thus, if we include Neonatal Preterm
  Birth in our models, the relative risks likely must be handled differently for
  this cause.

Risk Exposure Categories and TMREL
++++++++++++++++++++++++++++++++++

Vivarium Modeling Strategy
--------------------------

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see
   the {RISK_EXPOSURE_PAGE_LINK} page.

.. todo::

   Replace {RISK_EXPOSURE_PAGE_LINK} with a reference to the appropriate risk
   exposure page in the above note.

Interpolation of LBWSG Relative Risks
+++++++++++++++++++++++++++++++++++++

The GBD LBWSG modelers estimated the relative risk for all-cause mortality on
each 500g and 2wk category of birthweight (BW) and gestational age (GA). If we
assume a constant relative risk on each rectangular LBWSG category, these
relative risk estimates define a `piecewise constant function`_ on the union of
the LBWSG categories, which is a subset of the GAxBW rectangle
:math:`[0,42\text{wk}] \times [0,4500\text{g}]`.

This piecewise constant relative risk function is `discontinuous <continuous
function_>`_, jumping from one value to another at the linear boundaries between
the LBWSG categories (usually when GA is a multiple of 2 or BW is a multiple of
500), and the relative risk does not change at all within each LBWSG category.
Therefore, any simulated intervention that affects birthweight or gestational
age (e.g. a nutritional supplement given to pregnant mothers to increase the
birthweight of their newborns) can only have an effect on a small percentage of
our simulants, namely those whose birthweight or gestational age is near the
boundary of one of the LBWSG categories.

To correct for this deficiency, we are interested in coming up with a
continuously varying risk surface that interpolates between the relative risks
estimated by GBD. In addition to (probably) being a better model of reality,
this would allow every simulant the opportunity to get the effect of an
intervention that affects birthweight or gestational age. The practical effect
of this interpolation will be that every treated simulant will experience a
small change in relative risk, vs. a small proportion of treated simulants
experiencing a larger change in relative risk if we used the piecewise constant
risk surface.

.. _piecewise constant function: https://mathworld.wolfram.com/PiecewiseConstantFunction.html
.. _continuous function: https://en.wikipedia.org/wiki/Continuous_function

Strategy for Interpolating Relative Risks
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Since the region on which the GBD RRs are defined is `non-convex <convex
set_>`_, interpolating between the RRs is not completely straightforward. Using
`SciPy's interpolation package <scipy.interpolate_>`_, it required a two-step
process of first *extrapolating* the relative risks to a complete rectangular
grid, and then *interpolating the extrapolated values* to the full rectangular
GAxBW domain. Here is a description of the procedure Nathaniel used to
interpolate the LBWSG RRs for the `large-scale food fortification project`_ in
March 2021.

#.  **Start at category midpoints:** We will assume that the relative risk at
    the *midpoint* of each rectangular LBWSG category is equal to the relative
    risk for that category as estimated by GBD. That is, if
    :math:`\mathit{RR}_\text{cat}` is the GBD relative risk for the LBWSG
    category ':math:`\text{cat}`', and the midpoint of :math:`\text{cat}` is
    :math:`(x_\text{cat}, y_\text{cat})`, we will assume that
    :math:`\mathit{RR}(x_\text{cat},y_\text{cat}) = \mathit{RR}_\text{cat}`,
    where :math:`\mathit{RR}(x,y)` denotes the relative risk at gestational age
    :math:`x` and birthweight :math:`y`. Our goal is to assign an interpolated
    value to :math:`\mathit{RR}(x,y)` for all :math:`(x,y)\in [0,42\text{wk}]
    \times [0,4500\text{g}]`, starting with the values
    :math:`\mathit{RR}(x_\text{cat},y_\text{cat})` at the 58 category midpoints.

    .. note::

      One could consider using points other than the category midpoints to
      anchor the RRs. For example, perhaps it would be better to assign the GBD
      relative risk to the "average location of the category" with respect to
      prevalence, or to choose a point so that the average RR for the category
      matches the RR from GBD. However, this would (1) require using exposure
      data as well as RR data, which varies by location, and would (2) require
      more time on the parts of the human and the computer to implement.

#.  **Take logarithms:** Since the LBWSG relative risks vary widely between
    categories (from 1.0 in the TMREL up to more than 1600 in the highest risk
    category in some draws), we will do the interpolation in log space to keep
    everything at a reasonable scale, and then exponentiate the results. Thus,
    we compute :math:`\log(\mathit{RR}(x_\text{cat}, y_\text{cat}))` for each of
    the 58 category midpoints :math:`(x_\text{cat}, y_\text{cat})`, where
    :math:`\mathit{RR}` denotes the relative risk function as defined above, and
    :math:`\log` denotes the natural logarithm.

#.  **Define a rectangular grid:** In order to get SciPy's interpolation
    functions to work well, it helps to have the initial data points defined on
    a rectangular grid. The LBWSG category midpoints :math:`(x_\text{cat},
    y_\text{cat})` define a *partial* rectangular grid, so our strategy will be
    to use a simple interpolation method (`nearest-neighbor <nearest-neighbor
    interpolation_>`_) to extrapolate values of :math:`\log(\mathit{RR})` to the
    "missing" points on the full grid :math:`G` spanned by the category
    midpoints, and then use a more sophisticated method (`bilinear
    interpolation`_) to fill in values of :math:`\log(\mathit{RR})` between the
    grid points.

    In addition to the category midpoints, we will also include grid points on
    the GAxBW rectangle's boundary to guarantee that our interpolation will
    cover the entire domain defined by the LBWSG categories. To define the
    rectangular grid :math:`G` precisely, we first take the the unique GA and BW
    coordinates of the 58 category midpoints, plus the boundary values,

    .. math::

      \text{ga_grid} &=
        \{ x_\text{cat} : \text{cat is a LBWSG category}\}
        \cup \{0,42\}\\
      \text{bw_grid} &=
        \{ y_\text{cat} : \text{cat is a LBWSG category}\}
        \cup \{0,4500\},

    and then define the rectangular grid :math:`G` as the `Cartesian product`_
    of these coordinates,

    .. math:: G = \text{ga_grid} \times \text{bw_grid}.

    More explicitly, we can list the 13 :math:`x`-coordinates in
    :math:`\text{ga_grid}` and 11 :math:`y`-coordinates in
    :math:`\text{bw_grid}` in increasing order,

    .. math::
      :nowrap:

      \begin{alignat*}{7}
      x_0&=0,\, &x_1&=12,\, &x_2&=25, &&\ldots,\,
        &x_9&=37.5,\, &x_{10}&=39,\,
        &&x_{11}=41, x_{12}=42\\
      y_0&=0,\, &y_1&=250,\, &y_2&=750,\, &&\ldots,\,
        &y_9&=4250,\, &y_{10}&=4500,\,
        &&
      \end{alignat*}

    and then the rectangular grid of 143 points is

    .. math:: G = \{(x_i,y_j) : 0\le i\le 12, 0\le j\le 10\}.

    We can think of the grid :math:`G` as a "stepping stone" on our path to
    interpolating :math:`\log(\mathit{RR})` on the entire GAxBW rectangle
    :math:`[0,42\text{wk}] \times [0,4500\text{g}]`.

#.  **Extrapolate to the rectangular grid:** Use `nearest-neighbor
    interpolation`_ to extrapolate :math:`\log(\mathit{RR})` from the category
    midpoints :math:`(x_\text{cat}, y_\text{cat})` to all points on the
    rectangular grid :math:`G`. When doing this extrapolation, we rescale both
    the GA and BW coordinates to the interval :math:`[0,1]` before computing
    distances since the scales of gestational age and birthweight are
    incomparable and drastically different (0-42wk vs. 0-4500g). Explicitly,

    - Divide all the GA coordinates of points in :math:`G` by 42, and divide
      all the BW coordinates of points in :math:`G` by 4500.

    - For each rescaled grid point :math:`(x_i/42, y_i/4500)`, find the
      nearest rescaled category midpoint :math:`(x_\text{cat}/42,
      y_\text{cat}/4500)`, and set :math:`\log (\mathit{RR}(x_i,
      y_j)) = \log(\mathit{RR}(x_\text{cat}, y_\text{cat}))`.

    The rescaled nearest-neighbor interpolation can be easily implemented using
    SciPy's `griddata`_ function (with ``method='nearest'`` and
    ``rescale='True'``) or `NearestNDInterpolator`_ class (with
    ``rescale='True'``).

#.  **Interpolate to the full rectangle:** Use `bilinear interpolation`_ to
    fill in all values of :math:`\log(\mathit{RR})` in the entire GAxBW
    rectangle :math:`[0,42\text{wk}] \times [0,4500\text{g}]` from the
    extrapolated values of :math:`\log(\mathit{RR})` on the grid :math:`G`. The
    interpolating function :math:`f = \log(\mathit{RR})` is continuous and
    piecewise bilinear. On each rectangle whose corners are neighboring grid
    points, it has has the form

    .. math::

      \log(\mathit{RR}(x,y)) = f(x,y) = a + bx + cy + dxy
      \quad (x_i\le x\le x_{i+1}, y_j\le y\le y_{j+1}),

    where :math:`x` is gestational age, :math:`y` is birthweight, and
    :math:`a,b,c,d` are constants that depend on the function values at the
    rectangle's corners. There are 120 such rectangles indexed by :math:`i` and
    :math:`j`, and  each such rectangular "piece" of :math:`f` is linear in
    :math:`x` and :math:`y` separately and is quadratic as a function of two
    variables. The bilinear interpolation can be easily implemented using either
    SciPy's `RectBivariateSpline`_ class (with ``kx=1,ky=1``), or `interp2d`_
    function (with ``kind='linear'``), or `RegularGridInterpolator`_ class (with
    ``method='linear'``).

#.  **Exponentiate:** Once we interpolate :math:`f = \log(\mathit{RR})`, we
    recover the relative risks by computing :math:`\mathit{RR}(x,y) =
    \exp(f(x,y))`. The above interpolation strategy guarantees that the
    interpolated RRs will remain between the minimum and maximum RR values in
    GBD.

#.  **Reset RRs in TMREL categories to 1:** Since we assumed that the RR values
    were equal to the GBD RRs at the *midpoints* of the LBWSG categories, and
    the interpolated RRs vary continuously, the interpolated RRs in the TMREL
    categories will be greater than 1 as GA or BW approaches a category of
    higher relative risk. In order to be consistent with GBD, we reset the RR to
    1.0 in each of the four TMREL categories (cat53, cat54, cat55, cat56) after
    interpolation. This will introduce some discontinuity at the boundaries of
    the TMREL categories, but that is an acceptable tradeoff for consistency
    with GBD.

    .. note::

        It may be worth discussing the strategy of resetting the RRs to 1 with
        the GBD modelers to see if it matches their conception of the TMREL, or
        if it would actually be better to keep the interpolated RRs even though
        they are greater than 1 in some regions of the TMREL categories.

        Another option would be to add grid points at the corners of the TMREL
        categories, and set the RRs of these points to 1 before interpolating.
        This would force the the interpolated RRs to be 1 on the entire TMREL
        region while keeping the RR function continuous. This strategy would
        introduce 2 new :math:`x`-coordinates and 2 new :math:`y`-coordinates,
        increasing the grid size to :math:`15\times 13 = 195` and the number of
        interpolation rectangles to :math:`14\times 12 = 168`. This may or may
        not slow down the interpolation by a noticeable amount. Some care should
        be taken if using this approach, as it's possible that the interpolated
        RR values near the TMREL categories could change in undesirable ways.

.. _large-scale food fortification project: https://github.com/ihmeuw/vivarium_research_lsff

.. _convex set: https://en.wikipedia.org/wiki/Convex_set
.. _nearest-neighbor interpolation: https://en.wikipedia.org/wiki/Nearest-neighbor_interpolation
.. _bilinear interpolation: https://en.wikipedia.org/wiki/Bilinear_interpolation
.. _Cartesian product: https://en.wikipedia.org/wiki/Cartesian_product

.. _scipy.interpolate: https://docs.scipy.org/doc/scipy/reference/interpolate.html
.. _griddata: https://docs.scipy.org/doc/scipy/reference/generated/scipy.interpolate.griddata.html
.. _NearestNDInterpolator: https://docs.scipy.org/doc/scipy/reference/generated/scipy.interpolate.NearestNDInterpolator.html
.. _RectBivariateSpline: https://docs.scipy.org/doc/scipy/reference/generated/scipy.interpolate.RectBivariateSpline.html
.. _interp2d: https://docs.scipy.org/doc/scipy/reference/generated/scipy.interpolate.interp2d.html
.. _RegularGridInterpolator: https://docs.scipy.org/doc/scipy/reference/generated/scipy.interpolate.RegularGridInterpolator.html

Implementation of RR Interpolation in SciPy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  Show Python code that implements the above procedure. In the meantime, here
  are the original notebooks where I figured out how to do it (with pictures!):

  - https://github.com/ihmeuw/vivarium_data_analysis/blob/main/pre_processing/lbwsg/2021_03_09b_plot_lbwsg_rr_interpolation_using_griddata.ipynb
  - https://github.com/ihmeuw/vivarium_data_analysis/blob/main/pre_processing/lbwsg/2021_03_10a_plot_two_step_interpolated_rrs_for_lbwsg.ipynb
  - https://github.com/ihmeuw/vivarium_data_analysis/blob/main/pre_processing/lbwsg/2021_03_16a_lbwsg_compare_two_step_interpolation_plots.ipynb

  Here's a link to Jupyter nbviewer in case GitHub sucks:

  - https://nbviewer.jupyter.org/

  And here's my implementation of RR interpolation for a nanosim:

  - https://github.com/ihmeuw/vivarium_research_lsff/blob/main/nanosim_models/lbwsg.py#L722

Affected Outcomes in Vivarium
+++++++++++++++++++++++++++++

.. todo::

  List the risk-outcome relationships that will be included in the risk effects model for this risk factor. Note whether the outcome in a risk-outcome relationship is a standard GBD risk-outcome relationship or is a custom relationship we are modeling for our simulation.

.. list-table:: Risk Outcome Relationships for Vivarium
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * -
     -
     -
     -
     -

Risk Outcome Pair #1
++++++++++++++++++++

.. todo::

	Replace "Risk Outcome Pair #1" with the name of an affected entity for which a modeling strategy will be detailed. For additional risk outcome pairs, copy this section as many times as necessary and update the titles accordingly.

.. todo::

  Link to existing cause model document or other documentation of the outcome in the risk outcome pair.

.. todo::

  Describe which entitity the relative risks apply to (incidence rate, prevalence, excess mortality rate, etc.) and *how* to apply them (e.g. :code:`affected_measure * (1 - PAF) * RR`).

  Be sure to specify the exact PAF that should be used in the above equation and either how to calculate it (see the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document) or pull it (:code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'population_attributable_fraction')`, noting which affected entity and measure should be used)

.. todo::

  Complete the following table to list the relative risks for each risk exposure category on the outcome. Note that if there are many exposure categories, another format may be preferable.

  Relative risks for a risk factor may be pulled from GBD at the draw-level using :code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'relative_risk')`. You can then calculate the mean value as well as 2.5th, and 97.5th percentiles across draws.

  The relative risks in the table below should be included for easy reference and should match the relative risks pulled from GBD using the above code. In this case, update the :code:`Note` below to include the appropriate :code:`{risk_name}`.

  If for any reason the modeling strategy uses non-GBD relative risks, update the :code:`Note` below to explain that the relative risks in the table are a custom, non-GBD data source and include a sampling strategy.

.. note::

  The following relative risks are displayed below for convenient reference. The relative risks in the table below should match the relative risks that can be pulled at the draw level using :code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'relative_risk')`.

.. list-table:: Relative Risks
   :widths: 5 5 5
   :header-rows: 1

   * - Exposure Category
     - Relative Risk
     - Note
   * -
     -
     -

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  List validation and verification criteria, including a list of variables that will need to be tracked and reported in the Vivarium simulation to ensure that the risk outcome relationship is modeled correctly

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

	List assumptions and limitations of this modeling strategy, including any potential issues regarding confounding, mediation, effect modification, and/or generalizability with the risk-outcome pair.

Bias in the Population Attributable Fraction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As noted in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document, using a relative risk adjusted for confounding to compute a population attributable fraction at the population level will introduce bias.

.. todo::

	Outline the potential direction and magnitude of the potential PAF bias in GBD based on what is understood about the relationship of confounding between the risk and outcome pair using the framework discussed in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document.

References
----------

.. [GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]

 Pages 167-177 in `Supplementary appendix 1 to the GBD 2019 Risk Factors Capstone <2019_risk_factors_methods_appendix_>`_:

   **(GBD 2019 Risk Factors Capstone)** GBD 2019 Risk Factors Collaborators.
   :title:`Global burden of 87 risk factors in 204 countries and territories,
   1990–2019: a systematic analysis for the Global Burden of Disease Study
   2019`. Lancet 2020; **396:** 1223–49. DOI:
   https://doi.org/10.1016/S0140-6736(20)30752-2

.. _2019_risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf
