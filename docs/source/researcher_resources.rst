Documentation Index for Researchers
===================================

.. toctree::
   :maxdepth: 3
   :caption: Contents:


The Vivarium Framework
++++++++++++++++++++++

The Vivarium microsimulation framework is separated into numerous source-controlled repositories to keep things focused
and organized. A list of repositories relevant to researchers can be found below, including short descriptions and links
to the repositories and their documentation. Each repository holds installation information in its README.


Vivarium
--------

Vivarium is the core microsimulation framework and command line tools for running individual simulations. It contains
documentation about how Vivarium itself works as well as useful information about how a model is specified and tutorials
for running simulations and exploring them interactively, among other things.

- `Repository <https://github.com/ihmeuw/vivarium>`_
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium/en/latest/>`_


Vivarium Public Health
----------------------

Vivarium Public Health is a set of tools for Vivarium simulations that enable public health applications like disease
and intervention modeling. This is where we define things like SI- or SIS epidemiological models, or fertility models
for population growth. It also contains a useful tutorial on interacting with data artifacts.

- `Repository <https://github.com/ihmeuw/vivarium_public_health>`_
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium-public-health/en/latest/>`_


Vivarium Inputs
---------------

Vivarium Inputs contains the tools needed to create data artifacts from GBD data. The data artifact is a useful notion,
you can think of it as all of the data needed to run a simulation, packaged into one file. This package contains useful
functions for pulling raw GBD data as well as generating data as it is used in a simulation, which are vitally important
for vetting.

- `Repository <https://github.com/ihmeuw/vivarium_inputs>`_
- `Documentation <https://vivarium.readthedocs.io/projects/vivarium-inputs/en/latest/>`_


Vivarium Cluster Tools
----------------------

Vivarium Cluster Tools contains command line tools for running Vivarium simulations in parallel using IHME's cluster.
It contains documentation describing how this is done, as well as how YAML files and branches files work.

- `Repository <https://github.com/ihmeuw/vivarium_cluster_tools>`_
- `Documentation <https://vivarium-cluster-tools.readthedocs.io/en/latest/)>`_


GBD Mapping
-----------

GBD Mapping is a python package that contains all the things modeled by the GBD and their relationships. This means
things like causes, risk factors, and sequelae, as well as metadata about them. It's mainly interacted with by importing
the package and exploring it, and it's used by other Vivarium repositories, especially Vivarium Inputs.

- `Repository <https://github.com/ihmeuw/gbd_mapping>`_
- `Documentation <https://vivarium.readthedocs.io/projects/gbd-mapping/en/latest/gbd_mapping.html>`_


Useful Vivarium Tutorials
+++++++++++++++++++++++++

Each Vivarium repository contains documentation in the form of API references, tutorials, and/or conceptual information.
or both. These tutorials are especially useful and explain many common tasks but because they are scattered across many
repositories they can be hard to find. Below is a list of some of the most important pieces of documentation to know
about.


- `The model specification <https://vivarium.readthedocs.io/projects/vivarium/en/latest/concepts/model_specification.html>`_
- `Running a simulation <https://vivarium.readthedocs.io/projects/vivarium/en/latest/tutorials/running_a_simulation/index.html#running-a-simulation>`_
- `Exploring a simulation in an interactive setting <https://vivarium.readthedocs.io/projects/vivarium/en/latest/tutorials/exploration.html#exploring-a-simulation-in-an-interactive-setting>`_
- `Creating and altering a data artifact <https://vivarium-public-health.readthedocs.io/en/latest/tutorials/artifact.html#artifact>`_
- `The Vivarium Inputs data-pulling functions <https://vivarium.readthedocs.io/projects/vivarium-inputs/en/latest/api_reference/interface.html>`_
- `Running simulations in parallel <https://vivarium-cluster-tools.readthedocs.io/en/latest/distributed_runner.html>`_
- `YAML basics <https://vivarium-cluster-tools.readthedocs.io/en/latest/yaml_basics.html>`_
- `The branches file <https://vivarium-cluster-tools.readthedocs.io/en/latest/branch.html>`_


Understanding GBD Data
++++++++++++++++++++++

Currently, Vivarium utilizes GBD 2017 data. Understanding what data is available from this round and what modeling
process produced it is a difficult task. The interface in Vivarium Inputs provides a function for pulling GBD 2017 data,
but learning about it and understanding potential issues requires more effort. You may need to talk to GBD researchers,
but the links below can help.

- `GBD sources <http://pypi.services.ihme.washington.edu/docs/get_draws/latest-pre/sources.html>`_
- `GBD trainings <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=gbd2017&title=GBD+2017+Trainings>`_
- `Epidemiological terminology <https://hub.ihme.washington.edu/download/attachments/44794562/Epi%20terms%20training.pptx?version=1&modificationDate=1512166429000&api=v2>`_

Internal GBD teams also maintain up-to-date information scattered across a variety of R Shiny apps. A few are listed
below. They require VPN access.

- `GBD ID Tables <https://shiny.ihme.washington.edu/content/88/>`_
- `The GBD Shared Hierarchy Editor <https://she.ihme.washington.edu/explore/location/version/446>`_
- `The Risk Factor Toolbox <https://shiny.ihme.washington.edu/content/13/>`_


Model Development
+++++++++++++++++

The simulation science team is actively working on building out and improving a model development process to guide the
interactions between researchers and software engineers. The root of documentation can be found
`here <https://hub.ihme.washington.edu/display/COS/Model+Development>`_.
