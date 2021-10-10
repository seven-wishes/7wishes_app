import React from 'react';
import add_image from "../../../assets/images/add_image.svg";

const AccountGallery = ({images, deleteGalleryItem, uploadGallery}) => {
    const onFileSelected = (e) => {
        if(e.target.files[0]) {
            uploadGallery(e.target.files[0])
        }
    }

    return (
        <div className="account__gallery">
            <h3 className="account__section-title">Дополнительные фото</h3>
            <div className="account__gallery-list">
                {images.map(item => (
                    <div className="account__gallery-item" data-image={item.image_id} key={`gallery${item.image_id}`}>
                        <figure className="account__gallery-image">
                            <picture>
                                <img src={`http://7-wishes.ru${item.url}`} alt={item.image_id} className="image"/>
                            </picture>
                            <button className="account__gallery-delete" onClick={() => deleteGalleryItem(item.image_id)}>Удалить</button>
                        </figure>
                    </div>
                ))}
                <label htmlFor="account_gallery" className="account__gallery-item" >
                    <figure className="account__gallery-image">
                        <picture>
                            <img src={add_image} alt="" className="image"/>
                            <input id="account_gallery" name="account_gallery" type="file" className="account__images-input" onChange={onFileSelected} />
                        </picture>
                    </figure>
                </label>
            </div>
        </div>
    );
};

export default AccountGallery;