import React, { Component } from 'react';
import {
     Text,
     TouchableWithoutFeedback, 
     View,
     LayoutAnimation,
     UIManager
    } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from './actions';

class ListItem extends Component {
    
    constructor(){
        super();
        UIManager.setLayoutAnimationEnabledExperimental && 
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
    componentWillUpdate() {
        LayoutAnimation.spring();
    }
    
    renderDescription() {
        const { library, expanded } = this.props;
        const { descriptionStyle } = styles;
        
        if (expanded) {
            return (
                <CardSection>
                <Text style={ descriptionStyle }>
                {library.item.description}
                </Text>
                </CardSection>
            )
        }
    }


    render() {    
        const { titleStyle } = styles;
        const { id, title } = this.props.library.item;

        return (
            <TouchableWithoutFeedback
            
            onPress={() => this.props.selectLibrary(id)}
            >
                <View>
                <CardSection>
                    <Text style={titleStyle}>
                    {title}
                     </Text>
               </CardSection>
               {this.renderDescription()}
               </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 23,
        paddingLeft: 15,
        color: 'black'
    },
    descriptionStyle: {
        flex: 1, 
        color: 'black'
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.item.id;

    //return {selectedLibraryId: state.selectedLibraryId }
    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
