import React, { useEffect, useState, memo } from 'react';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WeatherIcon = ({ data, size }) => {
    const [iconData, setIconData] = useState();

    const Icon = (info) => {
        let wIcon = null;
        switch (info?.code) {
            case 200 | 201 | 202 | 230 | 231 | 232 | 233:
                wIcon = <FontAwesomeIcon icon={faBolt} className="thunder" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 300 | 301 | 302:
                wIcon = <FontAwesomeIcon icon={faCloudRain} className="drizzle" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 520 | 501 | 502 | 511 | 520 | 521 | 522:
                wIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} className="rain" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 600 | 601 | 602 | 610 | 611 | 612 | 621 | 622 | 623 | 700 | 711 | 721 | 731 | 741 | 751:
                wIcon = <FontAwesomeIcon icon={faSnowflake} className="snow" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 800:
                wIcon = <FontAwesomeIcon icon={faSun} className="clear" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            case 803:
                wIcon = <FontAwesomeIcon icon={faCloud} className="clouds" style={{ fontSize: size === 'large' ? '60px' : size === 'medium' ? '30px' : '15px' }} />;
                break;
            default:
                break;
        }
        return wIcon
    }

    useEffect(() => {
        data && setIconData(data);
    }, [data])


    return (
        <div>
            {Icon(iconData)}
        </div>
    );
}

export default memo(WeatherIcon);
