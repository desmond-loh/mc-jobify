import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

function AddJob() 
{
    const { 
        isLoading,
        isEditing,
        showAlert, 
        displayAlert, 
        company,
        position,
        jobLocation,
        jobType,
        jobTypeOptions,
        statusOptions,
        status,
        handleChange,
        clearValues,
        createJob, 
        editJob,
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        }
        if (isEditing) {
            editJob();
            return;
        }
        createJob();
    };

    const handleJobInput = (e) => {
        handleChange({name: e.target.name, value: e.target.value})
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
                {showAlert && <Alert />}
                <div className = "form-center">
                    <FormRow type="text" name="position" value={position} handleChange={handleJobInput}/>
                    <FormRow type="text" name="company" value={company} handleChange={handleJobInput}/>
                    <FormRow type="text" labelText='Location' name="jobLocation" value={jobLocation} handleChange={handleJobInput}/>
                    <FormRowSelect 
                        name="jobType" value={jobType} handleChange={handleJobInput} list={jobTypeOptions}
                    />
                    <FormRowSelect 
                        name="status" value={status} handleChange={handleJobInput} list={statusOptions}
                    />
                    <button onClick={handleSubmit} disabled={isLoading} className="btn btn-block submit-btn" type="submit">Submit</button>
                    <button onClick={(e) => {e.preventDefault();clearValues();}} className="btn btn-block clear-btn">Reset</button>
                </div>
            </form>
        </Wrapper>
    );
}

export default AddJob;