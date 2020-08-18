import React from 'react'; 
import { Form, Grid } from 'semantic-ui-react'

const InputField = ({gridWidth,labelName,name,value,type,maxlength,reqError,zipError,onChange,onFocus}) => {
    return (
        <Grid.Column width={gridWidth}>
            <Form.Field>
                <label className="inputLabel">{labelName}</label>
                <input
                 name={name}
                 value={value}   
                 type={type}  
                 onChange={(e)=> onChange(name,e.target.value)} 
                 onFocus={onFocus}
                 maxlength={maxlength}/>
            </Form.Field>
            {name == "location_name" && reqError && <div className="error-label" >Field is Required.</div>}
            {name == "zip_code" && !zipError && <div className="error-label" >Only Alphanumeric Digits.</div>}
        </Grid.Column>
          
    );
}

export default InputField;
