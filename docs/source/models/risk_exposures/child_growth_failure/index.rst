.. role:: underline
    :class: underline

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++
  
  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _risk_exposure_child_growth_failure:

=====================
Child Growth Failure
=====================

Child growth failure (CGF) in the GBD is a composite risk composed of three subrisks, including:

- Wasting, measured by weight for height z-scores (WHZ). REI ID = 240
- Stunting, measured by height for age z-scores (HAZ). REI ID = 241
- Underweight, measured by weight for age z-scores (WAZ). REI ID = 94

Notably, for a given age, there are only two metrics included across these three subrisk exposures: height and weight. Because these subrisks share metrics between one another (ex: both wasting and underweight exposures relate to child weight and child weight (underweight) is significantly influenced by child height (stunting)), there is definitional correlation between these risk exposures. 

In GBD, risk exposures for each of risks is first estimated at the continuous level and then converted to categorical exposures.

The risk exposure model documents for each CGF subrisk can be found below:

.. toctree::
   :maxdepth: 1
   :glob:

   */index*
