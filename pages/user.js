import {withRouter} from 'next/router'
import fetch from 'isomorphic-unfetch'

import Layout from '../components/DefaultLayout'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'

import { Row } from 'simple-flexbox';

const User = withRouter((props) => (
  <Layout pad_inner="0">
    <Row>
      <MainContent rec_data={props.rec_data}/>
    </Row>
  </Layout>
))

// access token: { props.router.query.access_token }

User.getInitialProps = async function(context) {
  const res = await fetch(`http://localhost:8888/dummydata`)
  const dummydata = await res.json()
  console.log(dummydata)

  return { rec_data: dummydata }
}


export default User
