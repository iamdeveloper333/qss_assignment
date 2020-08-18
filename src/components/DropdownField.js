import React from 'react'; 
import { Form, Grid,Dropdown } from 'semantic-ui-react';

const DropdownField = ({gridWidth,value,name,labelName,stateOptions,onChange}) => {
    return (
        <Grid.Column width={gridWidth}>
            <Form.Field> 
                <label className="inputLabel">{labelName}</label>
                <Dropdown  search selection options={stateOptions} 
                value={value}
                name={name}
                onChange={onChange}/>
            </Form.Field>
        </Grid.Column>
          
    );
}

export default DropdownField;
