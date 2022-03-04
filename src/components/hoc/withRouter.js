import React from "react";
import { useParams, useNavigate, useLocation, useMatch} from "react-router-dom";

const withRouter = (WrappedComponent) => {
    function ComponentWithRouterProp(props) {
        let navigate = useNavigate();
        let location = useLocation();
        let params = useParams();
            return (
                <WrappedComponent
                    { ...props } navigate={ navigate } location={ location } params={ params } match={useMatch} />
            )
        
    }
    return ComponentWithRouterProp;
    
};


export default withRouter;
