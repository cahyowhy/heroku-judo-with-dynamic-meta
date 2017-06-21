/* eslint react/forbid-prop-types: "off" */

import React from 'react';
import {Link} from 'react-router-dom';
import {MetaTag} from './MetaTag';
import {Layout} from './Layout';

const meta = {
  title: "Not Found",
  description: "Everything is gone",
  image: "404.png"
};
export class NotFoundPage extends React.Component {
  componentWillMount() {
    const {staticContext} = this.props;
    if (staticContext) {
      staticContext.is404 = true;
    }
  }

  render() {
    return (<div className="notFound">
        <MetaTag {...meta}/>
        <Layout>
          <div className="not-found">
            <h1>404</h1>
            <h2>Page not found!</h2>
            <p>
              <Link to="/">Go back to the main page</Link>
            </p>
          </div>
        </Layout>
      </div>
    );
  }
}

export default NotFoundPage;
