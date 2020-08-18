import React,{Component} from 'react'; 
import faker from 'faker'
import { Button , Form, Grid} from 'semantic-ui-react'
import InputField from '../components/InputField';
import DropdownField from '../components/DropdownField';
import _ from 'lodash';
import { timeZoneList } from "../utils/config";
import InputTagField from '../components/InputTagField';
import FacilityTimeModal from '../components/FacilityTimeModal';
import {updateSingleRecord} from '../actions/location';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import uuid from "uuid";

const addressDefinitions = faker.definitions.address
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: state,
}))

const TimeZoneOptions = [];
const TimeZoneLoop = _.forOwn(timeZoneList, function(value, key) {
    let obj = {
        key: key,
        text: key,
        value: value,
      }
      TimeZoneOptions.push(obj)
 } );

class EditLocation extends Component {

    constructor(props){
        super(props);
        this.state = {
            id:uuid.v4(),
            redirectTo:false,
            location_name:"",
            address_line_1:"",
            address_line_2:"",
            suite_num:"",
            city:"",
            zip_code:"",
            phone_number:"",
            time_zone:"",
            reqError:"",
            usState:"",
            zipError:true,
            appointment_pool:[],
            facility_time_obj:{
                'days':[],
                'startTime':"00:00",
                'endTime':"00:00"
            }
        }
    }
    componentDidMount(){ 
        
        let getData = this.props.location.locations.filter(val => {
            return val.id == this.props.match.params.id
        })
        this.setState({
            id:getData[0]["id"],
            location_name:getData[0]["location_name"],
            address_line_1:getData[0]["address_line_1"],
            address_line_2:getData[0]["address_line_2"],
            suite_num:getData[0]["suite_num"],
            city:getData[0]["city"],
            zip_code:getData[0]["zip_code"],
            phone_number:getData[0]["phone_number"],
            time_zone:getData[0]["time_zone"], 
            usState:getData[0]["usState"], 
            appointment_pool:getData[0]["appointment_pool"],
            facility_time_obj:getData[0]["facility_time_obj"]
        })

        let str1 = getData[0]["facility_time_obj"]["days"]
        let str2 = getData[0]["facility_time_obj"]["startTime"]
        let str3 = getData[0]["facility_time_obj"]["endTime"]
        let str =  "From " + str2 + " AM "  + "to " + str3 + " PM";
        this.setState({facility_time:str})

    }
 
    handleSubmit = () => { 
        const { location_name } = this.state;
        if(location_name == "") {
             this.setState({reqError:true})
        }
        else{
            let addLocaion = {
                "id": this.state.id,
                "location_name" : this.state.location_name,
                "address_line_1":this.state.address_line_1,
                "address_line_2":this.state.address_line_2,
                "suite_num":this.state.suite_num,
                "city":this.state.city,
                "usState":this.state.usState,
                "zip_code":this.state.zip_code,
                "phone_number":this.state.phone_number,
                "time_zone":this.state.time_zone,
                "appointment_pool":this.state.appointment_pool,
                "facility_time_obj":this.state.facility_time_obj
            }
            this.props.dispatch(updateSingleRecord({ data:addLocaion})); 
            this.setState({redirectTo:true})
        }

        
    }

    onChange = (name,value) => {
        if(name=="location_name"){
            this.setState({reqError:false})
        }
        else if(name == "zip_code"){
            var reg = new RegExp('^[a-zA-Z0-9]*$');
            reg.test(value);
            this.setState({zipError:reg.test(value)})
        }
        this.setState({
            [name]:value
        })
    }

    onChangeDropdown = (e, data) =>  {
        this.setState({
            [data.name]: data.value 
        })
    }

    facilityClose = () => {
        this.setState({facilityModalOpen:false})
    }

    facilityClick = () => { 
        this.setState({facility_time:"",facilityModalOpen:true}) 
    }

    appointmentPool = (data) => {
        this.setState({appointment_pool:data})
    }

    facilityTimeData = (arr,start,end) => {
        this.setState({
            facility_time_obj:{
                'days':arr,
                'startTime':start,
                'endTime':end
            }
        },()=>{
            let str1 = this.state.facility_time_obj["days"]
            let str2 = this.state.facility_time_obj["startTime"]
            let str3 = this.state.facility_time_obj["endTime"]
            let str =  "From " + str2 + " AM "  + "to " + str3 + " PM";
            this.setState({facility_time:str})
        })
    }

    render() {
        if(this.state.redirectTo){
            return <Redirect to={"/"} />
        }
        return (
            <div className="main_view"> 
                <FacilityTimeModal
                open={this.state.facilityModalOpen}
                onClose={this.facilityClose}
                facilityTimeData={this.facilityTimeData}
                days={this.state.facility_time_obj["days"]}
                start={this.state.facility_time_obj["startTime"]}
                end={this.state.facility_time_obj["endTime"]}
                />
                <div className="no_location_header">
                    <span>Locations</span>
                </div>
                <div style={{background:"ghostwhite",height:'90vh'}}>
                    <Form  className="form_data">
                        <p className="form_data_heading">Edit Locations</p>

                        <Grid>
                            <Grid.Row>

                                <InputField  
                                    gridWidth = {16}
                                    labelName="Location Name"
                                    name="location_name"
                                    value={this.state.location_name}
                                    type="text"
                                    onChange={this.onChange}
                                    reqError={this.state.reqError}
                                    maxlength={60}/>

                                <InputField  
                                    gridWidth = {8}
                                    labelName="Address Line 1"
                                    type="text"  
                                    name="address_line_1"
                                    value={this.state.address_line_1} 
                                    onChange={this.onChange}
                                     maxlength={60}/>

                                <InputField  
                                    gridWidth = {8}
                                    labelName="Suite No."
                                    name="suite_num"
                                    value={this.state.suite_num}
                                    type="text"
                                    onChange={this.onChange}
                                     maxlength={60}/>

                                <InputField  
                                    gridWidth = {8}
                                    labelName="Address Line 2"
                                    type="text"
                                    name="address_line_2"
                                    value={this.state.address_line_2}
                                    type="text"
                                    onChange={this.onChange}
                                     maxlength={60}/>

                                <InputField  
                                    gridWidth = {4}
                                    labelName="City"
                                    name="city"
                                    value={this.state.city}
                                    type="text"
                                    onChange={this.onChange}
                                    maxlength={60}/>
                                
                              
                                <DropdownField  
                                    gridWidth = {4}
                                    labelName="State"
                                    name="usState"
                                    value={this.state.usState} 
                                    stateOptions={stateOptions}
                                    onChange={this.onChangeDropdown}/>
                              
                                <InputField  
                                    gridWidth = {4}
                                    labelName="Zip Code"
                                    name="zip_code"
                                    value={this.state.zip_code}
                                    type="text"
                                    onChange={this.onChange}
                                    maxlength={10}
                                    zipError={this.state.zipError}/>
                                
                                <InputField  
                                    gridWidth = {4}
                                    labelName="Phone Number"
                                    name="phone_number"
                                    value={this.state.phone_number}
                                    type="tel"
                                    onChange={this.onChange}
                                    maxlength={10}
                                    /> 
                                
                                <DropdownField  
                                    gridWidth = {8}
                                    labelName="Time Zone"
                                    name="time_zone"
                                    value={this.state.time_zone}
                                    stateOptions={TimeZoneOptions}
                                    onChange={this.onChangeDropdown}/>

                               <InputField  
                                    gridWidth = {8}
                                    labelName="Facility Times"
                                    name="facility_time"
                                    value={this.state.facility_time}
                                    type="text"
                                    onFocus={this.facilityClick}/> 
                                
                                
                                <InputTagField 
                                    gridWidth = {8}
                                    labelName="Appointment Pool"
                                    name="appointment_pool"
                                    value={this.state.appointment_pool}
                                    type="text"
                                    appointmentPool={this.appointmentPool}/>   

                            </Grid.Row>
                        </Grid> 
                        <div style={{    padding: '15px 0px 10px',textAlign: 'right'}}>
                            <Button  type="button"  color='red' onClick={this.handleCancel} style={{margin:"0px 12px"}}>Cancel</Button>
                            <Button type="button"  color='blue' onClick={this.handleSubmit}>Save</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
 


function mapStateToProps({location}) { 
    
    return {
        location
    }
}

export default connect(mapStateToProps)(EditLocation)