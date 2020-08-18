import React,{Component} from 'react'
import { Icon, Pagination, Dropdown, Input } from 'semantic-ui-react'; 

let stateOptions = [
    { key: '1', value: '5', text: '5' },
    { key: '2', value: '10', text: '10' },
    { key: '3', value: '25', text: '25' },
    { key: '4', value: '30', text: '30' },
    { key: '5', value: '50', text: '50' }
]


class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.activePage
        }
        this.handlePageChange = this.handlePageChange.bind(this)
        this.handlePageNo = this.handlePageNo.bind(this)
    }

    handlePageNo(e, data) {
        if (e.target.value === "") {
            this.setState({ active: e.target.value })
        } else {
            this.setState({ active: e.target.value })
            this.props.onChange(e, data)
        }

    }

    handlePerPage = (e, data) => { 
        this.setState({ active: 1 });
        this.props.onLimitChange(data.value);
    }

    handlePageChange(event, data) {
        this.setState(() => ({ active: data.activePage }))
        this.props.onPageChange(event, data)
    }

    render() {
        const { pages,offset } = this.props;
        const { active } = this.state;
        let paginationValue=""
        if(typeof offset !== "string"){
            let convertedString = offset;
            paginationValue = convertedString.toString();
        }else{
            paginationValue = offset
        }

        return (
            <div className={'paginationDiv'}>
                <div className={'left'}>
                <span className={"pagination-page"}>Items Per Page</span>
                    <Dropdown className={'rowsPerPage'} compact defaultValue={paginationValue?paginationValue:'10'} selection
                        value={paginationValue ? paginationValue : "10"}  options={stateOptions} onChange={this.handlePerPage} />
                   
                </div>
                <div className={'center'}>
                    Page &nbsp;
                    <Input value={active} className={'pageNo'}
                        onChange={this.handlePageNo} style={{ 'width': '40px' }} />
                     &nbsp;&nbsp;of&nbsp;{pages}
                </div>
                <div className={'right'}>
                    <Pagination activePage={active}
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name="step backward"/> }}
                        lastItem={{ content: <Icon name="step forward"/> }}
                        prevItem={{ content: <Icon name="chevron left"/>}}
                        nextItem={{ content: <Icon name="chevron right"/> }}
                        onPageChange={this.handlePageChange}
                        totalPages={pages}
                    />
                </div>
            </div>
        )
    }
}

export default PaginationComponent