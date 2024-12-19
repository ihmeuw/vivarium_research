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

.. _programming_vivarium:

==============================================
Vivarium engineering for research team members
==============================================

The purpose of this page is to document information relevant to the Vivarium and Vivarium Public Health frameworks from a research perspective. This primarly includes "how-to" pages for different engineering type tasks. A good rule for an engineering type task included here is one that edits or is run from the engineering repository rather than from the research repository.

.. toctree::
   :maxdepth: 1
   :glob:

   */index


General Engineering Documentation for Relevant Packages
-------------------------------------------------------

Vivarium
++++++++

Vivarium is the core microsimulation framework and command line tools for
running individual simulations. It contains documentation about how Vivarium
itself works as well as useful information about how a model is specified and
tutorials for running simulations and exploring them interactively, among other
things.

- `Repository <https://github.com/ihmeuw/vivarium>`__
- `Documentation <https://vivarium.readthedocs.io/en/latest/>`__

.. image:: https://badge.fury.io/py/vivarium.svg
    :target: https://badge.fury.io/py/vivarium

.. image:: https://github.com/ihmeuw/vivarium/actions/workflows/build.yml/badge.svg?branch=main
    :target: https://github.com/ihmeuw/vivarium
    :alt: Latest Version

.. image:: https://readthedocs.org/projects/vivarium/badge/?version=latest
    :target: https://vivarium.readthedocs.io/en/latest/?badge=latest
    :alt: Latest Docs

.. image:: https://zenodo.org/badge/96817805.svg
   :target: https://zenodo.org/badge/latestdoi/96817805

Vivarium Public Health
++++++++++++++++++++++

Vivarium Public Health is a set of tools for Vivarium simulations that enable
public health applications like disease and intervention modeling. This is where
we define things like SI or SIS epidemiological models, or fertility models
for population growth. It also contains a useful tutorial on interacting with
data artifacts.

- `Repository <https://github.com/ihmeuw/vivarium_public_health>`__
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium-public-health/en/latest/>`__

.. image:: https://badge.fury.io/py/vivarium-public-health.svg
    :target: https://badge.fury.io/py/vivarium-public-health

.. image:: https://github.com/ihmeuw/vivarium_public_health/actions/workflows/build.yml/badge.svg?branch=main
    :target: https://github.com/ihmeuw/vivarium_public_health
    :alt: Latest Version

.. image:: https://readthedocs.org/projects/vivarium_public_health/badge/?version=latest
    :target: https://vivarium_public_health.readthedocs.io/en/latest/?badge=latest
    :alt: Latest Docs

.. image:: https://zenodo.org/badge/141212278.svg
   :target: https://zenodo.org/badge/latestdoi/141212278

Vivarium Cluster Tools
++++++++++++++++++++++

Vivarium Cluster Tools contains command line tools for running Vivarium
simulations in parallel using IHME's cluster. It contains documentation
describing how this is done, as well as how YAML files and branches files work.

- `Repository <https://github.com/ihmeuw/vivarium_cluster_tools>`__
- `Documentation <https://vivarium-cluster-tools.readthedocs.io/en/latest/>`__

.. image:: https://badge.fury.io/py/vivarium-cluster-tools.svg
    :target: https://badge.fury.io/py/vivarium-cluster-tools

.. image:: https://github.com/ihmeuw/vivarium_cluster_tools/actions/workflows/build.yml/badge.svg?branch=main
    :target: https://github.com/ihmeuw/vivarium_cluster_tools
    :alt: Latest Version

.. image:: https://readthedocs.org/projects/vivarium-cluster-tools/badge/?version=latest
    :target: https://vivarium-cluster-tools.readthedocs.io/en/latest/?badge=latest
    :alt: Documentation Status

Vivarium Inputs
+++++++++++++++

Vivarium Inputs contains the tools needed to create data artifacts from GBD
data. The data artifact is an important notion, you can think of it as all of
the data needed to run a simulation, packaged into one file. This package
contains useful functions for pulling raw GBD data as well as generating data as
it is used in a simulation, which are vitally important for vetting. There is a
helpful tutorial here for pulling data using these functions, too.

- `Repository <https://github.com/ihmeuw/vivarium_inputs>`__
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium-inputs/en/latest/>`__

.. image:: https://badge.fury.io/py/vivarium-inputs.svg
    :target: https://badge.fury.io/py/vivarium-inputs

.. image:: https://github.com/ihmeuw/vivarium_inputs/actions/workflows/build.yml/badge.svg?branch=main
    :target: https://github.com/ihmeuw/vivarium_inputs
    :alt: Latest Version

.. image:: https://readthedocs.org/projects/vivarium_inputs/badge/?version=latest
    :target: https://vivarium_inputs.readthedocs.io/en/latest/?badge=latest
    :alt: Latest Docs

GBD Mapping
+++++++++++

GBD Mapping is a python package that contains all the things modeled by the GBD
and their relationships. This means things like causes, risk factors, and
sequelae, as well as metadata about them. It's mainly interacted with by
importing the package and exploring it, and it's used by other Vivarium
repositories, especially Vivarium Inputs.

- `Repository <https://github.com/ihmeuw/gbd_mapping>`__
- `Documentation <https://vivarium.readthedocs.io/projects/gbd-mapping/en/latest/gbd_mapping.html>`__

.. image:: https://badge.fury.io/py/gbd-mapping.svg
    :target: https://badge.fury.io/py/gbd-mapping

.. image:: https://github.com/ihmeuw/gbd_mapping/actions/workflows/build.yml/badge.svg?branch=main
    :target: https://github.com/ihmeuw/gbd_mapping
    :alt: Latest Version

.. image:: https://readthedocs.org/projects/gbd_mapping/badge/?version=latest
    :target: https://gbd_mapping.readthedocs.io/en/latest/?badge=latest
    :alt: Latest Docs
