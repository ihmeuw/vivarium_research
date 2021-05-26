.. _2019_cause_diarrhea:

==================
Diarrheal Diseases
==================

Disease Description
-------------------




Modeling Diarrheal Diseases in GBD 2017
---------------------------------------



GBD Hierarchy
-------------

.. image:: DD_cause_hierarchy.svg

Cause Model Diagram
-------------------

.. image:: DD_cause_model.svg


S: **S**\ usceptible to diarrheal diseases

I: **I**\ nfected and currently experiencing a diarrheal disease bout


Model Assumptions and Limitations
---------------------------------

Note that GBD has done extensive work to divide up diarrhea cases into their
respective etiologies. For now, we omit this complexity. Further, GBD 
incorporates seasonality into the diarrhea model. Our model currently does not.

Regarding severity: the GBD model splits nonfatal diarrhea estimates into 
three severity categories, using a ratio applied across all estimates. This 
ratio might be expected to vary from location to location, or perhaps across 
time, and thus we assume this is a limitation of the GBD model.

.. todo::

   Verify the simple severity split approach is indeed a limitation. I.e., the 
   verify that the modelers expect a more complex pattern.


Data Description
----------------



Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.


References
----------

