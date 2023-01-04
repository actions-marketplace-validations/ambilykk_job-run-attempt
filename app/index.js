// libraries for github actions
const core = require('@actions/core');
const github = require('@actions/github');

// get the input value token
const token = core.getInput('token');

// create an instace of octokit
const octokit = github.getOctokit(token);

// use the current run id
const run_id = github.context.runId;
const currentJob= github.job;

// define the run function
async function run() {
    // define output array
    let run_attempt = 1;

    // List jobs for the workflow run to capture the current job id
    const jobsdata=await octokit.rest.actions.listJobsForWorkflowRun({
        owner: context.repo.owner,
        repo: context.repo.repo,
        run_id: run_id
      })

      for (const jobinfo of jobsdata.data.jobs) {
       if(jobinfo.name == currentJob){
          
          // get the current job details including run attempt
          const job_data=await octokit.rest.actions.getJobForWorkflowRun({
            owner: context.repo.owner,
            repo: context.repo.repo,
            job_id: jobinfo.id
          })

          // Get Job attempt and return as output/result
          console.log("Run Attempt: "+ job_data.data.run_attempt)
          run_attempt = job_data.data.run_attempt;
        }  
    }

    // set the output value
    core.setOutput('run-attempt', run_attempt);
}

// executing the run function
run();