.. _software:

===============================
The Vivarium Software Framework
===============================

The Vivarium microsimulation framework is separated into numerous
source-controlled repositories to keep things focused and organized. A list of
repositories relevant to researchers can be found below, including short
descriptions and links to the repositories and their documentation. Each
repository holds installation information in its README.

Each Vivarium repository contains documentation in the form of API references,
tutorials, and/or conceptual information. These tutorials are especially useful
and explain many common tasks but because they are scattered across many
repositories they can be hard to find. Below is a list of some of the most
important pieces of documentation to know about.


- `The model specification <https://vivarium.readthedocs.io/en/latest/concepts/model_specification/index.html>`_
- `Running a simulation <https://vivarium.readthedocs.io/en/latest/tutorials/running_a_simulation/index.html>`_
- `Exploring a simulation in an interactive setting <https://vivarium.readthedocs.io/en/latest/tutorials/exploration.html>`_
- `Creating and altering a data artifact <https://vivarium.readthedocs.io/en/latest/tutorials/artifact.html>`_
- `Pulling data using Vivarium Inputs <https://vivarium-inputs.readthedocs.io/en/latest/tutorials/pulling_data.html>`_
- `YAML basics <https://vivarium.readthedocs.io/en/latest/concepts/model_specification/yaml_basics.html#model-specification-yaml-concept>`_
- `The branches file <https://vivarium-cluster-tools.readthedocs.io/en/latest/branch.html>`_

.. contents:
   :local:

Vivarium
--------

Vivarium is the core microsimulation framework and command line tools for
running individual simulations. It contains documentation about how Vivarium
itself works as well as useful information about how a model is specified and
tutorials for running simulations and exploring them interactively, among other
things.

- `Repository <https://github.com/ihmeuw/vivarium>`__
- `Documentation <https://vivarium.readthedocs.io/en/latest/>`__

Vivarium Public Health
----------------------

Vivarium Public Health is a set of tools for Vivarium simulations that enable
public health applications like disease and intervention modeling. This is where
we define things like SI or SIS epidemiological models, or fertility models
for population growth. It also contains a useful tutorial on interacting with
data artifacts.

- `Repository <https://github.com/ihmeuw/vivarium_public_health>`__
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium-public-health/en/latest/>`__


Vivarium Inputs
---------------

Vivarium Inputs contains the tools needed to create data artifacts from GBD
data. The data artifact is an important notion, you can think of it as all of
the data needed to run a simulation, packaged into one file. This package
contains useful functions for pulling raw GBD data as well as generating data as
it is used in a simulation, which are vitally important for vetting. There is a
helpful tutorial here for pulling data using these functions, too.

- `Repository <https://github.com/ihmeuw/vivarium_inputs>`__
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium-inputs/en/latest/>`__


Vivarium Cluster Tools
----------------------

Vivarium Cluster Tools contains command line tools for running Vivarium
simulations in parallel using IHME's cluster. It contains documentation
describing how this is done, as well as how YAML files and branches files work.

- `Repository <https://github.com/ihmeuw/vivarium_cluster_tools>`__
- `Documentation <https://vivarium-cluster-tools.readthedocs.io/en/latest/>`__


GBD Mapping
-----------

GBD Mapping is a python package that contains all the things modeled by the GBD
and their relationships. This means things like causes, risk factors, and
sequelae, as well as metadata about them. It's mainly interacted with by
importing the package and exploring it, and it's used by other Vivarium
repositories, especially Vivarium Inputs.

- `Repository <https://github.com/ihmeuw/gbd_mapping>`__
- `Documentation <https://vivarium.readthedocs.io/projects/gbd-mapping/en/latest/gbd_mapping.html>`__
