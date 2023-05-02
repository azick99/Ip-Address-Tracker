import IpInformation from './IpInformation'

const IpInfoContainer = ({ ipData, noData }) => {
  const errorCode = ipData.code === 422
  const { ip, location, isp } = ipData

  if (noData) {
    return (
      <div className="app-container">
        <div className="app-content bg-white text-dark">
          <IpInformation title="IP Address " information="83.24.213.173" />
          <IpInformation title="Location" information="PL, Warsaw" />
          <IpInformation title="Timezone" information="+02:00" />
          <IpInformation
            title="ISP"
            information="Orange Polska Spolka Akcyjna"
            noLine="no-line"
          />
        </div>
      </div>
    )
  }
  if (errorCode) {
    return (
      <div className="ip-con fs-500">
        <p className="ip-text">Wrong ip, please try again!</p>
      </div>
    )
  }
  return (
    <div className="app-container">
      <div className="app-content bg-white text-dark">
        <IpInformation title="IP Address " information={ip} />
        <IpInformation
          title="Location"
          information={`${location.country}, ${location.city}`}
        />
        <IpInformation title="Timezone" information={location.timezone} />
        <IpInformation title="ISP" information={isp} noLine="no-line" />
      </div>
    </div>
  )
}

export default IpInfoContainer
