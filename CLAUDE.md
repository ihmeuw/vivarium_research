# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Vivarium Research** documentation repository - a comprehensive collection of public health intervention modeling documentation built with Sphinx. The project contains extensive reStructuredText documentation for epidemiological models, causal inference methods, and microsimulation frameworks used in global health research.

## Development Environment Setup

### Required Dependencies
- Python 3.13
- Conda environment management
- System packages: `graphviz`, `pandoc`

### Initial Setup
```bash
# Create conda environment
conda create -y --name=vivarium_research python=3.13 graphviz pandoc
conda activate vivarium_research

# Install Python dependencies
pip install -r requirements.txt
```

### Python Dependencies (requirements.txt)
- `sphinx` - Documentation generation
- `sphinx-autobuild` - Live reload during development  
- `sphinx_rtd_theme` - Read the Docs theme
- `nbsphinx` - Jupyter notebook integration
- `ipython` - Interactive Python shell
- `matplotlib` - Plotting and visualization

## Common Development Commands

### Documentation Building
```bash
# Build HTML documentation (from docs/ directory)
cd docs
make html

# Build with strict error checking (used in CI)
make html SPHINXOPTS="-W --keep-going -n"

# Live reload during development
sphinx-autobuild source build/html
```

### Development Workflow
```bash
# Test documentation builds locally before committing
cd docs && make html

# View built documentation
open docs/build/html/index.html  # macOS
xdg-open docs/build/html/index.html  # Linux
```

## Repository Structure

### Core Documentation Areas
- **`docs/source/model_design/`** - General modeling methodology and Vivarium framework guides
- **`docs/source/models/`** - Specific model implementations:
  - `concept_models/` - 20+ documented Vivarium projects (Gates Foundation, Swiss Re, etc.)
  - `causes/` - Disease and condition models
  - `intervention_models/` - Public health intervention models  
  - `risk_exposures/` & `risk_effects/` - Risk factor modeling
  - `templates/` - Documentation templates for new models
- **`docs/source/onboarding_resources/`** - New contributor guides
- **`docs/source/glossary/`** - Project terminology

### Documentation Standards
- **Format**: reStructuredText (.rst) with Sphinx directives
- **Template System**: Use templates in `docs/source/models/templates/` for new model documentation
- **Diagrams**: Support for SVG, PNG, and draw.io diagrams
- **Jupyter Integration**: Notebooks supported via nbsphinx

## Model Documentation Patterns

### Concept Models
Located in `docs/source/models/concept_models/`, each project typically includes:
- `concept_model.rst` - Main documentation file
- Diagram files (`.svg`, `.drawio`, `.png`)
- Data files (`.csv`, `.xlsx`) 
- Supporting documentation and memos

### Model Templates
Use standardized templates from `docs/source/models/templates/`:
- `concept_model_template.rst` - For new project models
- `cause_model_template.rst` - For disease/condition models
- `intervention_model_template.rst` - For intervention models
- `risk_exposure_template.rst` & `risk_effects_template.rst` - For risk factor models

## Architecture Notes

### Sphinx Configuration
- **Theme**: sphinx_rtd_theme (Read the Docs)
- **Extensions**: autodoc, intersphinx, doctest, todo, nbsphinx
- **Minimum Sphinx Version**: 4.0
- **Build Directory**: `docs/build/`
- **Source Directory**: `docs/source/`

### Content Organization
- Models are organized by type and research domain
- Each model follows standardized documentation structure
- Extensive cross-referencing between related models
- Integration with Global Burden of Disease (GBD) methodologies

### Current Research Focus
- Opioid Use Disorder (OUD) modeling (current branch: `moud_sim`)
- Maternal/Newborn/Child Health interventions
- Cancer screening programs
- Nutrition optimization studies

## CI/CD Pipeline

### GitHub Actions (`.github/workflows/build.yml`)
- **Trigger**: All pushes, pull requests, manual dispatch
- **Python Version**: 3.13
- **Build Command**: `make html -C docs/ SPHINXOPTS="-W --keep-going -n"`
- **System Dependencies**: Installs pandoc and graphviz via apt-get

### Quality Assurance
- **CRITICAL**: Documentation must build with ZERO warnings for PRs to merge
- Documentation must build without errors
- All internal links must resolve correctly
- Images and diagrams must be accessible
- Test locally with strict warnings: `make html SPHINXOPTS="-W --keep-going -n"`

## Branch Management
- **Main Branch**: `main`
- **Feature Branches**: Use descriptive names (e.g., `moud_sim` for current OUD work)
- **PR Requirements**: Documentation must build successfully in CI

## Hosted Documentation
- **Read the Docs**: https://vivarium-research.readthedocs.io/en/latest/
- **Contribution Guidelines**: https://vivarium-research.readthedocs.io/en/latest/onboarding_resources/contributing/index.html