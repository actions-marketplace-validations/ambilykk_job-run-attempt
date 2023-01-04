// libraries for github actions
const core = require('@actions/core');
const github = require('@actions/github');

// get the input value token
const token = core.getInput('token');

// create an instace of octokit
const octokit = github.getOctokit(token);

// use the current run id
const run_id = github.context.runId;
const currentJob = github.context.job;

// define the run function
async function run() {
    // define output array
    let run_attempt = 1;

    // console log the start of the run
    console.log("Starting run ");

    // List jobs for the workflow run to capture the current job id
    const jobsdata = await octokit.rest.actions.listJobsForWorkflowRun({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        run_id: run_id
    })

    console.log("Current Job: " + currentJob);

    for (const jobinfo of jobsdata.data.jobs) {
        if (jobinfo.name == currentJob) {

            console.log("Job Identified");
            // get the current job details including run attempt
            const job_data = await octokit.rest.actions.getJobForWorkflowRun({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                job_id: jobinfo.id
            })

            // Get Job attempt and return as output/result
            console.log("Run Attempt: " + job_data.data.run_attempt)
            run_attempt = job_data.data.run_attempt;
        }
    }

    // set the output value
    core.setOutput('run-attempt', run_attempt);
}

// executing the run function
run();