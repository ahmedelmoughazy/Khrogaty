import React, { Component } from 'react';
import { Image , TextInput,WebView} from 'react-native';
import { Container, Card,Item, Content, CardItem, Button,View, Left,  Body,  Text, Spinner , Form,Tab, Tabs} from 'native-base';

type Props = {};
export default class DetailsScreen  extends Component<Props> {
    state = { dataComments:[] , name:"" , comment:"", addingComment: 0}

    static navigationOptions = ({navigation})=>({

        title: navigation.state.params.title,
        headerTintColor:'white',
        headerBackground: (
            <Image
                style={{width:'100%',height:100}}
                source={require('../Backgrounds/theme-header.png')}
            />
        ),
    });

    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/comments?post="+this.props.navigation.getParam('id')).then((response)=>response.json())
            .then((resJson)=>{
                this.setState({dataComments:resJson},function(){
                    console.log(resJson)
                })
            })
    }


    render() {
        return (
            <Container style={{marginTop:50}}>
                <Tabs  tabStyle={{color:'white'}}>

                    <Tab  heading="About"
                          tabStyle={{backgroundColor:'white'}} textStyle={{color:'black'}}
                          activeTabStyle={{backgroundColor:'white'}} activeTextStyle={{color:'green'}}
                    >
                        <Content>
                            <View style={{
                                width:"100%",height:'30%', flexDirection: "row",flex:1
                            }}>
                                <Image style={{width:'100%' , height:200}}
                                       source={{uri:this.props.navigation.getParam('image')}}/>
                            </View>

                            <Card style={{borderRadius:10}}>
                                <CardItem >
                                    <Text style={{color:'blue' , fontSize:24,fontWeight:'bold'}}>
                                        { this.props.navigation.getParam('title')}
                                    </Text>
                                </CardItem>

                                <CardItem >
                                    <Body>
                                    <Text>
                                        { this.props.navigation.getParam('content').slice(4)}
                                    </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Text style={{color:'blue' , fontSize:24,fontWeight:'bold',paddingLeft:'4%' ,margin:'2%'}}>
                                More Information
                            </Text>

                            <Card>
                                <CardItem >
                                    <Body style={{flexDirection:'row'}}>
                                    <Image source={require('../Icons/address.png')} style={{width:25, height: 25}} />

                                    <Text style={{paddingLeft:'3%'}}>
                                        { this.props.navigation.getParam('address')}
                                    </Text>
                                    </Body>
                                </CardItem>

                                <CardItem >
                                    <Body style={{flexDirection:'row'}}>
                                    <Image source={require('../Icons/call.png')} style={{width:25, height: 25}} />

                                    <Text style={{paddingLeft:'3%'}}>
                                        { this.props.navigation.getParam('phone')}
                                    </Text>
                                    </Body>
                                </CardItem>



                                <CardItem >
                                    <Body style={{flexDirection:'row'}}>
                                    <Image source={require('../Icons/mail.png')} style={{width:25, height: 25}} />

                                    <Text style={{paddingLeft:'3%'}}>
                                        { this.props.navigation.getParam('email')}
                                    </Text>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Text style={{color:'blue' , fontSize:24,fontWeight:'bold',paddingLeft:'4%' ,margin:'2%'}}>
                                Leave Comment
                            </Text>

                            {this.reloadComments()}
                            {this.returnComments()}


                            <Card>

                                <CardItem>
                                    <Body>
                                    <Form style={{width: '100%'}}>
                                        <Item  style={{width: '100%'}}>
                                            <TextInput
                                                style={{height: 40, width: '90%', borderColor: 'gray', borderWidth: 1}}
                                                onChangeText={(name) => this.setState({name})}
                                                value={this.state.name}
                                                placeholder="Your Name"
                                            />

                                        </Item>
                                        <Item  style={{width: '100%'}}>
                                            <TextInput
                                                style={{height: 100, width: '90%', borderColor: 'gray', borderWidth: 1}}
                                                onChangeText={(comment) => this.setState({comment})}
                                                value={this.state.comment}
                                                placeholder="Your Comment"
                                                multiline = {true}
                                                numberOfLines = {3}

                                            />

                                        </Item>
                                    </Form>
                                    </Body>
                                </CardItem>
                                <CardItem style={{flexDirection: 'column'}}>

                                    {this.commentButton()}

                                </CardItem>

                            </Card>




                        </Content>
                    </Tab>

                    <Tab  heading="Map"
                          tabStyle={{backgroundColor:'white'}} textStyle={{color:'black'}}
                          activeTabStyle={{backgroundColor:'white'}} activeTextStyle={{color:'green'}}
                    >
                        <WebView
                            source={{uri: this.props.navigation.getParam('map_location')}}

                        />
                    </Tab>

                </Tabs>


            </Container>
        );
    }


    returnComments()
    {
        return(
            this.state.dataComments.map((mappedData)=>{
                return(
                    <Card key={mappedData.id}>
                        <CardItem>
                            <Left>
                                <Image source={require('../Icons/profile.png')} style={{width:25, height: 25}} />
                                <Text>
                                    {mappedData.author_name}
                                </Text>
                            </Left>

                        </CardItem>
                        <CardItem>

                            <Body>
                            <Text style={{marginLeft:'8%'}}>
                                {mappedData.content.rendered}
                            </Text>

                            </Body>
                        </CardItem>

                    </Card>
                )
            })
        )
    }


    commentButton(){
        if(this.state.addingComment === 0){
            return(

                <View style={{
                    flex: 1,
                    justifyContent: 'space-between', alignItems:'center'}}>
                    <Button success onPress={()=>{
                        if(this.state.name === "" || this.state.comment ==="" )
                        {
                            alert("Please fill all data");
                        }
                        else
                        {
                            this.addComment();
                            this.setState({addingComment: 1})


                        }

                    }}>
                        <Text style={{borderRadius:15, fontWeight: 'bold'}}>Add Comment</Text>
                    </Button>
                </View>
            )
        }else{
            return(
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between', alignItems:'center'}}>
                    <Button success onPress={()=>{
                    }}>
                        <Spinner />
                    </Button>
                </View>

            )
        }
    }

    addComment(){
        fetch('http://reactnative.website/iti/wp-json/wp/v2/comments?author_name='+ this.state.name +'&author_email=itialex39@roqay.com.kw&content='+ this.state.comment +'&post='+ this.props.navigation.getParam('id'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res)=> res.json())
            .then((rj)=>{
                this.setState({addCommentRes: rj, addingComment: 0, name: "", comment: ""}, function(){
                    console.log(rj);

                })
            })
    }


    reloadComments()
    {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/comments?post="+this.props.navigation.getParam('id')).then((response)=>response.json())
            .then((resJson)=>{
                this.setState({dataComments:resJson},function(){

                })
            })
    }

}