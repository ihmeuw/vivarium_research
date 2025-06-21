# CLAUDE.md

This file provides additional guidance to Claude Code (claude.ai/code) when working on the MOUD sim documentation.

## Project Overview

The **MOUD (Medications for Opioid Use Disorder) Simulation** models interventions to reduce the burden of the opioid epidemic. This is a Vivarium microsimulation model with two core components:

1. **Core Disease Model**: 3-state transition model (susceptible → with condition → on treatment)
2. **Quarters Model**: 3-state housing/incarceration model (private residence, unhoused, incarcerated)

## Documentation Structure

### Main Files
- **`concept_model.rst`** - Primary documentation with model overview, graphviz diagrams, and state definitions
- **`evidence_based_treatment.rst`** - MOUD delivery (methadone, buprenorphine, naltrexone)
- **`recovery_support.rst`** - Long-term recovery services (housing, peer support, employment)  
- **`harm_reduction.rst`** - Risk reduction strategies (naloxone, SSPs, supervised consumption)
- **`data_monitoring.rst`** - Primary prevention and surveillance systems

### Intervention Categories
Following U.S. HHS framework:
1. Data Monitoring and Primary Prevention
2. Enhanced Delivery of Evidence-Based Treatment  
3. Recovery Support
4. Integrated Harm Reduction

## Technical Implementation

### Graphviz Diagrams
- **Disease Model Diagram**: Core 3-state OUD progression with transition rates (i, r, ti, tf, ts)
- **Quarters Model Diagram**: Housing/incarceration transitions with 6 transition rates
- Both use `.. graphviz::` directives with DOT notation

### Key Model Features
- OUD states serve as risk exposures for other health outcomes
- Treatment state has no excess mortality/disability vs. susceptible
- Model calibrated to GBD 2021 OUD prevalence estimates
- Quarters model affects intervention accessibility and effectiveness

### State Definitions
**Disease Model:**
- `susceptible`: No OUD
- `with_condition`: OUD, no treatment  
- `on_treatment`: OUD with MOUD

**Quarters Model:**
- `private_residence`: Stable housing
- `unhoused`: Experiencing homelessness
- `incarcerated`: In correctional facility

## Content Standards

### Cross-References
- Use `:ref:` for internal document references (e.g., `:ref:`data_monitoring_ref``)
- Use `:doc:` for linking between main documentation files
- Maintain consistent abbreviation definitions (MOUD, OUD, SSP, HCV, etc.)

### Documentation Patterns
- Include overview, key modeling components, and implementation considerations in each intervention section
- Use list-tables for state and parameter definitions
- Follow standard RST section hierarchy with proper decorators
- Include toctree in main concept_model.rst for sub-documents

### Terminology
- **MOUD**: Medications for Opioid Use Disorder
- **OUD**: Opioid Use Disorder  
- **SSPs**: Syringe Services Programs
- **PDMPs**: Prescription Drug Monitoring Programs
- **HCV/HIV**: Hepatitis C/Human Immunodeficiency Virus

## Research Focus: LGBT Latino Communities

### Current Documentation Emphasis
- **Primary prevention** is the intervention area of interest for LGBT Latino communities in Seattle and Yakima
- Documentation presents research on substance use patterns across different populations
- Family-centered interventions and culturally-responsive approaches are examined as prevention strategies

### Research Evidence Summary
- Studies show sexual minority Hispanic adolescents have higher adjusted odds of certain substance use behaviors
- Research documents associations between acculturation and opioid misuse patterns in Hispanic populations
- Community-based participatory approaches show promise for intervention development
- Family acceptance appears to influence social support and health outcomes

### Geographic Context
- Washington State SOR grant supports prevention through community coalitions and culturally-responsive programming
- Seattle and Yakima represent urban and rural contexts where prevention approaches may need adaptation
- Existing LGBTQ+-affirming services provide potential integration points for prevention strategies

## Model Validation
- Parameters must align with GBD 2021 estimates
- Treatment ratios designed for internal consistency
- State prevalences should match real-world epidemiological data
- Intervention effects based on published literature and expert consultation
- **Population-specific considerations**: Incorporate research on substance use patterns across different demographic groups
