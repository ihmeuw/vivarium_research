.. _software:

======================
The Vivarium Framework
======================

The Vivarium microsimulation framework is separated into numerous
source-controlled repositories to keep things focused and organized. A list of
repositories relevant to researchers can be found below, including short
descriptions and links to the repositories and their documentation. Each
repository holds installation information in its README.

.. contents:
   :local:


Vivarium
--------

Vivarium is the core microsimulation framework and command line tools for
running individual simulations. It contains documentation about how Vivarium
itself works as well as useful information about how a model is specified and
tutorials for running simulations and exploring them interactively, among other
things.

- `Repository <https://github.com/ihmeuw/vivarium>`_
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium/en/latest/>`_


Vivarium Public Health
----------------------

Vivarium Public Health is a set of tools for Vivarium simulations that enable
public health applications like disease and intervention modeling. This is where
we define things like SI or SIS epidemiological models, or fertility models
for population growth. It also contains a useful tutorial on interacting with
data artifacts.

- `Repository <https://github.com/ihmeuw/vivarium_public_health>`_
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium-public-health/en/latest/>`_


Vivarium Inputs
---------------

Vivarium Inputs contains the tools needed to create data artifacts from GBD
data. The data artifact is an important notion, you can think of it as all of
the data needed to run a simulation, packaged into one file. This package
contains useful functions for pulling raw GBD data as well as generating data as
it is used in a simulation, which are vitally important for vetting. There is a
helpful tutorial here for pulling data using these functions, too.

- `Repository <https://github.com/ihmeuw/vivarium_inputs>`_
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium-inputs/en/latest/>`_


Vivarium Cluster Tools
----------------------

Vivarium Cluster Tools contains command line tools for running Vivarium
simulations in parallel using IHME's cluster. It contains documentation
describing how this is done, as well as how YAML files and branches files work.

- `Repository <https://github.com/ihmeuw/vivarium_cluster_tools>`_
- `Documentation <https://vivarium-cluster-tools.readthedocs.io/en/latest/)>`_


GBD Mapping
-----------

GBD Mapping is a python package that contains all the things modeled by the GBD
and their relationships. This means things like causes, risk factors, and
sequelae, as well as metadata about them. It's mainly interacted with by
importing the package and exploring it, and it's used by other Vivarium
repositories, especially Vivarium Inputs.

- `Repository <https://github.com/ihmeuw/gbd_mapping>`_
- `Documentation <https://vivarium.readthedocs.io/projects/gbd-mapping/en/latest/gbd_mapping.html>`_
