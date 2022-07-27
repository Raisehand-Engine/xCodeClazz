class Layout extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

connect(mapStateToProps)(Layout);