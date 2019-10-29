export const SHOW_POPUP = 'SHOW_POPUP'

export const PUT_OBJECTS = 'PUT_OBJECTS'

export const putObjects = (objectsToRender: any) => {
    console.log('BasePopupActions putObjects')
    return { type: PUT_OBJECTS, objectsToRender }
}

export const showPopup = () => {
    console.log('BasePopupActions showPopup')
    return { type: SHOW_POPUP }
}