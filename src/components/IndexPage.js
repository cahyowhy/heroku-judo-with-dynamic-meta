import React from 'react';
import {AthletePreview} from './AthletePreview';
import {MetaTag} from './MetaTag';
import {Layout} from './Layout';

const meta = {
  title: 'JudoHeroes',
  description: 'All best judoHeroes',
  image: 'logo-judo-heroes.png'
};

export const IndexPage = ({athletes}) => (
  <div>
    <MetaTag {...meta}/>
    <Layout>
      <div className="home">
        <div className="athletes-selector">
          {athletes.map(
            athleteData => <AthletePreview key={athleteData.id} {...athleteData} />,
          )}
        </div>
      </div>
    </Layout>
  </div>
);

export default IndexPage;
