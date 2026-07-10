import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { addAd, setActiveAd } from '../../../store/ad.slice';
import { Ad } from '../../../store/primitives/Ad';

const AdComponent = () => {
    const { ads, activeAdId } = useSelector((state: RootState) => state.mediator.ad);
    const activeAd = activeAdId ? ads[activeAdId] : null;
    const dispatch = useDispatch();

    const handleAddDummyData = () => {
        const dummyAd: Ad = {
            id: 'ad1',
            title: 'SPIN AND GET MORE REWARDS',
            buttonText: 'Spin Now',
            icon: '🎰',
        };
        dispatch(addAd(dummyAd));
        dispatch(setActiveAd(dummyAd.id));
    };

    useEffect(() => {
        handleAddDummyData();
    }, []);

    const handlePress = () => {
        console.log('Spin Now clicked');
    };

    if (!activeAd) {
        return (
            <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
                <p>Loading ad...</p>
                <button onClick={handleAddDummyData}>Add Dummy Ad</button>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '0 18px', marginTop: '18px' }}>
            <div style={{
                backgroundColor: '#9B59B6',
                borderRadius: '20px',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
                <div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 'bold' }}>{activeAd.title}</h3>
                    <button
                        onClick={handlePress}
                        style={{
                            backgroundColor: '#8E44AD',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        {activeAd.buttonText}
                    </button>
                </div>
                <div style={{ fontSize: '48px' }}>{activeAd.icon}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#FFA500' }} />
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#E0E0E0' }} />
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#E0E0E0' }} />
            </div>
        </div>
    );
};

export default AdComponent;
