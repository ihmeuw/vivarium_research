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

.. _vivarium_best_practices_time_steps:

=========================================================
Choosing an Appropriate Time Step
=========================================================

.. contents::
   :local:
   :depth: 3

.. warning::

  There are proposed/in-progress vivarium framework improvements that will affect the information on this page. These framework improvements include:

    1. In-progress implementation of a variable simulation clock that allows for timestep duration to be affected by vivarium components
    2. Outstanding proposal to update the default rate-to-probability calculation as a function of the simulation timestep to account for potential bias, :ref:`as described here <rate_timestep_adjustment>`.

General Considerations
----------------------

Generally, a timestep should be as large as possible while meeting model verification criteria and producing all desired outputs. Larger timesteps are more desirable because they decrease computational time and resources required to run the model.

Some modeling features that may impact timestep duration decisions include:

- Rate-based choices

  - See below.

- Modeled events between specified time intervals. For example, a monthly timestep may be desired if simulants attend monthly medication sessions

  - This is because Vivarium simulants can only undergo one transition in each cause/intervention model per timestep. So if the timestep is very long, it's unrealistic that only one thing happened to them during that long timestep, because in all likelihood something else would have happened to them in between that first event and the end of the timestep.

- Duration-based choices: if the average duration of a given condition is 10 days, a timestep longer than 10 days may not be appropriate

  - This is because Vivarium person-time observers always work on the assumption that someone was in the same state for the entire timestep duration. If people in real life would be more quickly moving between states than the timestep allows, this assumption becomes highly inaccurate and V&V criteria may not be met.

.. todo::

  Add more detail to the explanation behind the second two bullets and brainstorm potential solutions to work around these constraints if necessary.

Relationship between timesteps and modeled rates in Vivarium
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Vivarium relies on the following approximation where :math:`r` is some rate and :math:`dt` is the simulation time step duration:

.. math::

  1 - e^{-r \times dt} \approx r \times dt

.. note::

  What’s going on is that we’re thinking of rate :math:`r` as an exponentially distributed continuous random variable. But in Vivarium this random variable gets discretized into a geometric random variable, I believe with parameter :math:`p = 1 - e^{-r \times dt}`. The mean of the exponential random variable is :math:`r`, whereas the mean of the geometric random variable, converted from time steps back to days, is :math:`dt/p`.

.. todo::

  Add more detail on why this is the case from an implementation stand point?

However, when :math:`r >> dt`, this approximation becomes less accurate. When this approximation does not hold (when a given rate is much larger than the simulation timestep), the rates from Vivarium simulation outputs will not accurately reflect the desired rates in the Vivarium simulation inputs (model verification will not be successful).

Notably, while this approximation may hold at the population level, it is important to remember that rates are heterogeneous at the individual level in Vivarium simulations, so it may not validate for particular subgroups with higher outcome rates due to their high-risk exposures, which may still cause model verification to be unsuccessful.

Theoretically, in the case of modeling high rates, a small enough timestep (:math:`dt`) may be selected to achieve verification criteria. However, this may not be desireable for as smaller timesteps will lead to longer run times and more demands for computational resources. Therefore, the following solutions may be considered:

Rate adjustment
^^^^^^^^^^^^^^^

Artificially inflate rate :math:`r` using the following equation:

.. math::

  r' = (-1/dt) \times ln(1 - dt \times r)

So then:

.. math::

  1 - e^{-r' \times dt} \approx r \times dt 

Therefore, when :math:`r'` is used as an input value in Vivarium, :math:`r` will be output.

This strategy may be considered when there is a single parameter in a simulation that results in the violation of the approximation and the timestep is otherwise well-suited for the model, such as the :ref:`remission rate of diarrheal diseases <2019_cause_diarrhea>`. 

Cause exclusions
^^^^^^^^^^^^^^^^

Mortality rates may vary dramatically by age, particularly when modeling children and the elderly. Additionally, excess mortality rates are definitionally higher than cause-specific mortality rates. Therefore, modeling strategies that avoid modeling excess mortality among these high-mortality age groups and model cause-specific mortality instead may be desireable. 

An example of this strategy was utilized by the :ref:`child IV iron simulation <2019_concept_model_vivarium_iv_iron_child_sim>`, in which diarrheal diseases and lower respiratory infection causes among the neonatal age groups were included by their CSMR only (affected by the LBWSG risk factor) rather than an incidence/remission model that included EMRs.

Asynchronous models
^^^^^^^^^^^^^^^^^^^

Sometimes, the difference in rates across age groups may be so great that it may be desireable to model them asynchronously. This strategy was used in the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron>` in which women of reproductive age were modeled separately than children, with a longer timestep among the adults than the children. This strategy will require tracking of output data from one of the models at the individual level to be used as inputs to the other.