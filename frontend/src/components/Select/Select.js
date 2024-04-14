import classNames from "classnames/bind";
import styles from './Select.module.scss';
import { useId, useState } from "react";

import Popper from '~/components/Popper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Select({ 
    className,
    data = [], 
    defaultValue, 
    label,
    inline = false,
    name,
    onChange=() => {},
    ...otherProps
}) {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState();
    const id = useId();

    const handleSelectItem = (item) => {
        setValue(item.name);
        onChange(item.name);
    }

    return (
        <>
            {label ? (
                <div 
                    className={cx('wrapper', { inline })}
                    onClick={() => setIsActive(!isActive)}
                >
                    <label className={cx('font-semibold', 'label')} htmlFor={id}>{label}</label>
                    <div id={id} className={cx('container', className)}>
                        <div className={cx('select-input')} {...otherProps}>{value || defaultValue}</div>
                        <FontAwesomeIcon 
                            className={cx('select-icon')} 
                            icon={isActive ? faChevronUp : faChevronDown} 
                        />
                        <Popper 
                            className={cx('select-popper', 
                                { active: isActive, })
                            }
                        >
                            <ul>
                                {data.map((item, index) => (
                                    <li 
                                        className={cx('select-item')}
                                        key={index}
                                        onClick={() => handleSelectItem(item)} 
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </Popper>
                    </div>
                </div>
            ) : (
                <div 
                    className={cx('container', inline)}
                    onClick={() => setIsActive(!isActive)}
                >
                    <div className={cx('select-input')} {...otherProps}>{value || defaultValue}</div>
                    <FontAwesomeIcon 
                        className={cx('select-icon')} 
                        icon={isActive ? faChevronUp : faChevronDown} 
                    />
                    <Popper 
                        className={cx('select-popper', 
                            { active: isActive, })
                        }
                    >
                        <ul>
                            {data.map((item, index) => (
                                <li 
                                    className={cx('select-item')}
                                    key={index}
                                    onClick={() => handleSelectItem(item)} 
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </Popper>
                </div>
            )}
        </>
    );
}

export default Select;