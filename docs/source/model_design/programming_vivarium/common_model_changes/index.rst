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

.. _common_model_changes:

====================
Common Model Changes
====================

.. contents::
   :local:
   :depth: 1

Here we have an ongoing list of model changes that are frequently 
needed and how to handle them. This section can continually be 
expanded with more examples over time. 

.. todo::

  Add to this page with other common requests over time. Include how-to type information and relevant notes.

Change Stratifications for an Observer
--------------------------------------

Often stratifications differ between V&V runs and later model 
runs. This allows us to identify issues or get more granular 
data. Since these tend to change, it's important to know how to 
implement any changes. 

You will need to check or edit three different files to include a stratification: 

#. First, you'll need to look at the :code:`components/observers.py` file to check that the code for your needed stratification exists or add it. 
#. Before you run the model, you'll need to update the :code:`model_specifications/model_spec.yaml` file to include the stratification.

Let's walk through an example. Say we want to add a stratification of SAM treatment 
coverage to our child wasting observer. This would allow us to count the number of 
children with wasting by their SAM treatment coverage status. 

First, we look at the :code:`components/observers.py` file. Inside, there is the 
:code:`ResultsStratifier` class, which has the information for all stratification 
variables. You can look through the code and see if a :code:`builder.results.register_stratification` 
matches with your needed stratification. In this case, there is one called 
:code:`sam_treatment`. If the stratification does not exist, you can either try to 
write one based on the other examples in the section, or ask an engineer for help. 

Second, we look at the bottom of the :code:`model_specifications/model_spec.yaml` file, under 
:code:`configuration` and then :code:`stratification` and add the new 
stratification needed. For example, this is what the new code block might 
look like: 

.. code-block:: bash 
  :linenos:

    configuration: 
      stratification: 
        child_wasting: 
          include: ['sam_treatment']

Check that both the observer name (:code:`child_wasting`) and the stratification 
variable name (:code:`sam_treatment`) match what is found in the 
:code:`components/observers.py` file. You're now ready to start the model run! 

Turn off a Component in the Model
---------------------------------

Another common request is to turn off a component in a model. This might 
be for V&V to test results without a risk component, or turning off an observer 
that isn't needed for a particular model run. 

Let's do an example of turning off the SAM treatment component in a model (for now, 
let's ignore that simply setting this to 0 coverage would probably be easier!).

In general, you'll need to edit :code:`model_specifications/model_spec.yaml` file 
to change the components run. In this case, you can see the component :code:`WastingTreatment('risk_factor.severe_acute_malnutrition_treatment')` which is the 
SAM treatment. By commenting out this line, we will not run that componenet in the 
model. More information on the :code:`model_specifications/model_spec.yaml` file 
is on the :ref:`running simulations page <running_simulations_rt>`. 

In simple cases, commenting out this one line is all you'll need to do! However, 
you should check for a couple of things. First, sometimes model components have a separate 
observer component. So for example there is both a :code:`ChildWasting()` and 
:code:`ChildWastingObserver()` component. If you try to observe something that's 
not in the model, you will likely get an error. 

Second, since we removed the SAM treatment component, we can't have other 
variables be stratified by this any more. See the above section for more 
details, but make sure to check if you will need to change any stratifications 
based on the removed observers. 

Lastly, just take a second to think through the model and if the component has 
other likely downstream effects. For example, if we removed the child wasting 
component from the model, the targeting for SAM and MAM treatment wouldn't make 
sense any more. This will change a lot for each model, so spend a bit of time 
thinking through changes in the context of your model. 
