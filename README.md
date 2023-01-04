# Job Run Attempt 
Return the run attempt of the current job. 
This action will help us to implement the workflow to **Prevent/Block** or **Conditionally** rerun the subsequent steps in the job based on the run attempt. 

 >  **run-attempt == 1** : indicates the first run of the job
 
 >  **run-attempt > 1** : indicates the **Rerun** of the job

# How to Use the Action

## action in workflow

Include the job-run-attempt action in your workflow. 

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

## Output generated

Below screenshot shows the execution of the action. 
1. First execution - executed all steps

![Screenshot 2023-01-04 at 3 59 05 PM](https://user-images.githubusercontent.com/10282550/210535777-71f4d760-a6c3-4b0f-9b0a-424f949bb8fd.png)


2. Rerun of the 'second' job - executed only the action; subsequent steps skipped


![Screenshot 2023-01-04 at 3 59 47 PM](https://user-images.githubusercontent.com/10282550/210535810-75683807-b25d-4105-b84f-8ce1b08f6268.png)



## Parameters

| Name                           | Required  | Input/Output | Description                                           |
|--------------------------------|-----------|---------------|-------------------------------------------------------|
| token                 | Yes | Input | PAT Token for access    |
| run-attempt                     |  | Output | Run attempt for the current job |


# License

The scripts and documentation in this project are released under the [MIT License](./LICENSE)
