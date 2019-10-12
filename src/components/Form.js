import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    guest,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  function handleGuest(event) {
    event.preventDefault();
    guest();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="form-btns">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          <button className="button button-secondary" onClick={handleGuest}>Log In As Guest</button>
        </div>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
