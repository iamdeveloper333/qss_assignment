import React,{Component} from 'react'; 
import { Form, Grid } from 'semantic-ui-react'
  
class InputTagField extends Component {
    constructor() {
      super();
      this.state = {
        tags: []
      };
    }

    componentDidUpdate(prevProps, prevState){
      if(prevProps.value != this.props.value){
        this.setState({
          tags:this.props.value
        })
      }
    }
    
    removeTag = (i) => {
      const newTags = [ ...this.state.tags ];
      newTags.splice(i, 1);
      this.setState({ tags: newTags });
      this.props.appointmentPool(newTags);

    }
  
    inputKeyDown = (e) => {
      const val = e.target.value;
      if (e.key === 'Enter' && val) {
        if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
          return;
        }
        this.setState({ tags: [...this.state.tags, val]},()=>{
          this.props.appointmentPool(this.state.tags);
        });
        this.tagInput.value = null;
      } else if (e.key === 'Backspace' && !val) {
        this.removeTag(this.state.tags.length - 1);
      }
     
    }
  
    render() {
      const { tags } = this.state; 
      return (
        <Grid.Column width={this.props.gridWidth}>
          <Form.Field>
            <label className="inputLabel">{this.props.labelName}</label>
            
            <ul className="input-tag__tags">
              { tags.map((tag, i) => (
                <li key={tag}>
                  {tag}
                  <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                </li>
              ))}
              <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
            </ul>
          </Form.Field> 
        </Grid.Column>
      );
    }
  }
   
export default InputTagField ;