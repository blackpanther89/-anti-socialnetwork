render() {
    const {
        wannabes
    } = this.props;
    const {
        friends
    } = this.props;
    //         console.log('this.props', this.props);
    if (!wannabes || !friends) {
        return null;
    }

    return ( <
            div className = 'friends_and_wannabes' >
            <
            h1 > If you wanna be my friend.. < /h1>

            {
                wannabes.map(wannabes => {
                    return ( <
                        div className = "wannabes"
                        key = {
                            wannabes.id
                        } >
                        <
                        img src = {
                            wannabes.image
                        }
                        /> {
                            wannabes.firstName
                        } {
                            wannabes.lastName
                        } <
                        button onClick = {
                            () => this.props.dispatch(acceptFriend(wannabes.id))
                        } >
                        ACCEPT FRIEND REQUEST < /button> <
                        /div>
                    )

                })
            }
        )

        <
        div className = "friends"
    key = {
            friends.id
        } >
        <
        h1 > My friends < /h1> {
            friends.map(friends => {
                return ( <
                    div className = "friends"
                    key = {
                        friends.id
                    } >
                    <
                    img src = {
                        friends.image
                    }
                    /> {
                        friends.firstName
                    } {
                        friends.lastName
                    } <
                    button onClick = {
                        () => this.props.dispatch(unfriend(friends.id))
                    } >
                    END FRIENDSHIP < /button>

                    <
                    /div>
                )

            })
        } <
        /div>
}
}

    const mapStateToProps = function(state) {
        console.log('state eeeee', state)
        return {
            // filter methos might come handy  array accepted  colon false
            wannabes: state.wannabes && state.wannabes.filter(data => data.accepted == false),
            friends: state.friends && state.friends.filter(data => data.accepted == true)
            // filter out eve
            // loop threw all the accepted friends array accepted colon  true
        }
    }
