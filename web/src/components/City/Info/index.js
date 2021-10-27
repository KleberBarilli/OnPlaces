import * as React from 'react';

function CityInfo(props) {
  const {info} = props;
  const displayName = `${info.name}`;

  return (
    <div>
      <div>
        {displayName} |{' '}
        <a
          target="_new"
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
        >
          Wikipedia
        </a>
      </div>

      <img width={250} src={`https://api-cities.s3.amazonaws.com/${info.image}`} />
    </div>
  );
}

export default React.memo(CityInfo);