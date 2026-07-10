import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../../../store';

const selectCategoriesEntities = (state: RootState) => state.learning.categories.entities;

const selectFeaturedCategories = createSelector(
  [selectCategoriesEntities],
  (entities) => Object.values(entities).filter(c => c?.featured)
);

const FeaturedCategories = () => {
  const featuredCategories = useSelector(selectFeaturedCategories);

  const handleSelectCategory = (categoryName: string) => {
    console.log('Selected category:', categoryName);
  };

  return (
    <div style={{ marginTop: '28px', marginHorizontal: '18px', fontFamily: 'sans-serif' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#212121', marginBottom: '10px' }}>Featured Categories</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between' }}>
            {featuredCategories.map((category) => (
                <div
                    key={category.id}
                    onClick={() => handleSelectCategory(category.name)}
                    style={{
                        width: '45%',
                        marginBottom: '12px',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '12px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        border: '1px solid #eee'
                    }}
                >
                    <span style={{ fontSize: '20px', color: category.color || '#00B5D8', marginRight: '10px' }}>📁</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#212121' }}>{category.name}</span>
                </div>
            ))}
            {featuredCategories.length === 0 && (
                <div style={{ color: '#666', fontSize: '14px' }}>No featured categories available.</div>
            )}
        </div>
    </div>
  );
};

export default FeaturedCategories;
