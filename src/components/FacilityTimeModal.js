import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'; 
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

class FacilityTimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            weeklyTimes:[] ,
            startTime:"00:00",
            endTime:"00:00"
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.days != this.props.days || prevProps.start != this.props.start || prevProps.end != this.props.end){
          this.setState({
            weeklyTimes:this.props.days ,
            startTime:this.props.start,
            endTime:this.props.end
          })
        }
      }

    handleChange = (e) => { 
        this.setState({[e.target.name]:e.target.value}) 
    }

    handleBlur = (e) => {
        if(e.target.name == "endTime"){
            let arr = e.target.value.slice().split(":");
            if(Number(arr[0])>12){
                arr[0] = arr[0]%12; 
                if(arr[0]<10){
                    arr[0]= "0"+arr[0]
                }
            }
            this.setState({endTime:arr.join(":")}) 
        }
        else if(e.target.name == "startTime"){
            let arr = e.target.value.slice().split(":");
            if(Number(arr[0])>=12){
                arr[0] = "11"; 
            }
            this.setState({startTime:arr.join(":")}) 
        }
    }

    handleChangeCheck = (values, e) => {
        this.setState({
            [e.target.name]: values
        });
    }

    handleSave = () => {
        this.props.facilityTimeData(this.state.weeklyTimes,this.state.startTime,this.state.endTime);
        this.props.onClose();
    }

    onClose = () => {
        this.props.facilityTimeData(this.state.weeklyTimes,this.state.startTime,this.state.endTime);
        this.props.onClose();
    }


    render() { 
        return (
            <Modal 
                open={this.props.open}
                onClose={this.onClose}
                style={{width:"46vw"}}
                > 
                <Modal.Content>
                   <p>Facility Time</p>
                   <div>
                        <CheckboxGroup
                            readOnly={true} 
                            name="weeklyTimes"
                            value={this.state.weeklyTimes}
                            checkboxDepth={2}
                            onChange={this.handleChangeCheck}
                            style={{ 'display': 'flex', 'overflow': 'auto',flexDirection: 'column'}}>
                                    
                           {["Sun","Mon","Tue","Wed","Thr","Fri","Sat"].map(val=>{
                               return(
                                <label className="check-container" style={{    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',padding:"12px 0px"}} >
                                <Checkbox value={val} style={{    marginTop: '2px'}}/> 
                                <span className="checkmark" style={{fontSize: '13px', color: '#8e8e8e',    display: 'block',width: '35px'}}>{val} </span>
                                <input
                                type="time"
                                name="startTime"
                                value={this.state.startTime} 
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                style={{width:"60px",  width: '70px',border: '1px solid #d4d2d2',borderRadius: '5px',lineHeight: '18px',marginLeft: '15px'}} />
                               
                                <Button.Group color='blue'>
                                   <Button className="am_button" style={{background: '#0471c3'}}>AM</Button>
                                   <Button className="pm_button" style={{background: '#ececec',color:"black"}}>PM</Button> 
                                </Button.Group>

                                <input 
                                    type="time" 
                                    name="endTime"
                                    value={this.state.endTime} 
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    style={{width:"60px",  width: '70px',border: '1px solid #d4d2d2',borderRadius: '5px',lineHeight: '18px',marginLeft: '15px'}} />
                               
                                <Button.Group color='blue'>
                                   <Button className="am_button" style={{ background: '#ececec',color:"black"}}>AM</Button>
                                   <Button className="pm_button" style={{background: '#0471c3'}}>PM</Button> 
                               </Button.Group>


                                <Button basic color='blue' style={{   padding: '0px 20px',margin: '0px 10px',fontSize: '11px'}}>
                                   Apply to All checked
                               </Button>
                           </label>
                               )
                           })} 
                        </CheckboxGroup> 
                   </div>

                   <div style={{    padding: '15px 0px 10px',textAlign: 'right'}}>
                        <Button type="button"  color='blue' onClick={this.handleSave}>Save</Button>
                    </div>

                </Modal.Content> 
            </Modal>
            
        )
    }
}

export default FacilityTimeModal;
