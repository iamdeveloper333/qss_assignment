import React,{Component} from 'react'; 
import { Button , Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {deleteSingleRecord} from '../actions/location';
import {connect} from 'react-redux'; 
import ReactTable from "react-table";
import PaginationComponent from '../components/PaginationComponent';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit: 10,
            count: 0,
            activePage: 1,
            locationData: this.props.location.locations,
            dataEdit:{}
          }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.location != this.props.location){
             this.setState({
              locationData : this.props.location.locations
             }) 
        } 
    }

    handleRowActions = (state, rowInfo, column, instance) =>{
      return {
        onClick: (e, handleOriginal) => {
          if (column.id == "action-edit") {
            this.setState({
              editRedirect: true,
              dataEdit:rowInfo.original
            });
          }
          else if (column.id == "action-delete") {
            this.props.dispatch(deleteSingleRecord({ id:rowInfo.original.id}));
          }
        }
      };
    }

    handlePagination = (e, data) => { 
      if (data.activePage && data.activePage !== this.state.activePage) {
          this.setState({activePage: data.activePage},() => 
          this.setState({
              locationData:this.props.location.locations.slice(((this.state.activePage-1)*this.state.limit),(this.state.activePage*this.state.limit))
          }));
      }
    }

    onLimitChange = (limiter) => { 
      this.setState({limit: limiter,activePage:1},() => 
        this.setState({
            locationData:this.props.location.locations.slice(((this.state.activePage-1)*this.state.limit),(this.state.activePage*this.state.limit))
        })
      )
    }

    handleInput = (e) => { 
      if (e.target.value <= (Math.ceil(this.props.location.locations.length / this.state.limit)) && e.target.value !== this.state.activePage) {
          this.setState({activePage: e.target.value}, () => { 
            this.setState({
                locationData:this.props.location.locations.slice(((this.state.activePage-1)*this.state.limit),(this.state.activePage*this.state.limit))
            })  
          });

      }
    }

    render() { 
        let data = this.state.locationData.map(val => {
           val["address"] = `${val.address_line_1}, ${val.address_line_2}`;
           return val
        }); 
        
        return (
            <div className="main_view"> 
                <div className="no_location_header">
                    <span>Locations</span>
                    <Link to={"/add"}> <Button className="add_location"> <Icon name='plus' />Add Location</Button></Link>
                </div>
                { this.props.location.locations.length > 0 ? 
                  <div style={{background:"ghostwhite",padding:'20px 15px',height:'90vh'}}>
                    <ReactTable
                      data={data}
                      columns={[
                        {
                            Header: "",
                            id: "row",
                            maxWidth: 50,
                            filterable: false,
                            Cell: (row) => {
                                return <div>{row.index + 1}</div>;
                            }
                        },
                        
                        {
                          Header: "Location Name",
                          accessor: "location_name"
                        },  
                        {
                          Header: "Address",
                          accessor: "address"
                        } ,
                        {
                            Header: "Phone No.",
                            accessor: "phone_number",
                            Cell: row => {
                              return (
                                <div>{row.original.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</div>
                              );
                            }
                        },
                        {
                          id: "action-edit", 
                          filterable: false,
                          accessor: "", 
                          Cell: row => {
                            return (
                              <Link to={{ pathname:`/edit/${row.original.id}`}} >
                                <div className={"actions edit"}>
                                  <Icon className={"actionsicon "} name="pencil" />
                                </div>
                              </Link>
                            );
                          },
                          width: 50,
                        },
                        {
                          id: "action-delete", 
                          filterable: false,
                          accessor: "",  
                          Cell: row => {
                            return (
                              <div className={"actions delete"}>
                                <Icon
                                  className={"actionsicon"}
                                  name="trash alternate"
                                />
                              </div> 
                            );
                          },
                          width: 50,
                        }
                      ]}
                  pageSize={this.state.locationData.length}
                  getTdProps={this.handleRowActions}
                />

                <PaginationComponent
                  offset={this.state.limit}
                  onPageChange={this.handlePagination}
                  onChange={this.handleInput}
                  onLimitChange={this.onLimitChange}
                  pages={Math.ceil(this.props.location.locations.length / this.state.limit)}
                  activePage={this.state.activePage}
                />
              </div>
                :
              <div className="no_location_body">
                  <div className="location_icon_wrapper">
                      <Icon name='map marker alternate' /> 
                  </div>
                  <p style={{margin:0,fontSize: '15px',fontWeight: 700,paddingBottom: '10px'}}>Kindly Add Your Location First</p>
                  <p style={{fontSize: '12px',color: '#7b7878'}}>There is no location added right now.</p>
              </div>}
            </div>
        )
    }
}


function mapStateToProps({location}) {
    return {
        location
    }
}

export default connect(mapStateToProps)(Home)