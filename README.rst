=================
Vivarium Research
=================

.. image:: https://readthedocs.org/projects/vivarium-research/badge/?version=latest
   :target: https://vivarium-research.readthedocs.io/en/latest/?badge=latest
   :alt: Documentation Status

Here you'll find a variety of useful information about working on ``vivarium``
research projects.

The hosted documentation can be found at https://vivarium-research.readthedocs.io/en/latest/.

Information on how to contribute to vivarium research docs can be found at https://vivarium-research.readthedocs.io/en/latest/onboarding_resources/contributing/index.html. 

Use the following steps to build the docs locally::


.. _installation:
::

   $> conda create -y --name=vivarium_research python=3.13 graphviz pandoc
   $> conda activate vivarium_research
   (vivarium_research) $> git clone https://github.com/ihmeuw/vivarium_research.git
   (vivarium_research) $> cd vivarium_research
   (vivarium_research) $> pip install -r requirements.txt

.. _end_installation:

Test that you've got it with::

   (vivarium_research) $> cd docs
   (vivarium_research) $> make html
