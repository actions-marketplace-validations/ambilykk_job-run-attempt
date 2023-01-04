# Job Run Attempt 
Return the run attempt of the current job. 
This action will help to implement the workflow to prevent or conditionally rerun the steps in the job. 

# How to Use the Action

## action in workflow

Include the job-run-attempt action in your workflow. 

1: Pass the GITHUB_TOKEN

```
      - name: Testing Job Run Attempt action
        id: runst
        uses: ambilykk/job-run-attempt@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
            
      - name: Execute only first time; no rerun
        if: ${{steps.runst.outputs.run-attempt == 1}}
        run: | 
          echo " Execute only once; no rerun allowed"

```

2. Output generated

Below screenshot shows the execution of the action. 
1. First execution - executed all steps
2. Rerun of the 'second' job - executed only the action; subsequent steps skipped




## Parameters

| Name                           | Required  | Input/Output | Description                                           |
|--------------------------------|-----------|---------------|-------------------------------------------------------|
| token                 | Yes | Input | PAT Token for access    |
| run-attempt                     |  | Output | Run attempt for the current job |


# License

The scripts and documentation in this project are released under the [MIT License](./LICENSE)
