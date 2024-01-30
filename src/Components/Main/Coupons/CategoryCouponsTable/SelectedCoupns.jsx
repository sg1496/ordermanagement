// import React from 'react';
// import './CouponsTable.scss'
// const SelectedCoupns = (props) => {

//     // const categorySelectionHandler = (id, item) => {

//     //     const itemselected = [...props.selectedCategory];
//     //     console.log(itemselected)
//     //     if (id) {
//     //         item.IsChecked = true;
//     //     }
//     //     else {
//     //         item.IsChecked = false;
//     //     }
//     //     props.setCategoryCoupons(itemselected);

        
//     // }

//     console.log("444444444", props)
//     return (
//         <>

//             {props.selectedCategory?.filter(item=>item.IsChecked) < 1 ? (
//                 ""
//             ) : (<div className='coupons_table mt-3 mb-5 '>

//                 <table className='table m-0'>
//                     <thead>

//                         <tr>
//                             <th scope="col" >selected Categories</th>
//                         </tr>

//                     </thead>
//                     <tbody>
//                         {props.selectedCategory?.filter(item=>item.IsChecked).map((selectedCat, index) => {
//                             return <tr key={index}>
//                                 <td scope="row" onClick={() => props.categorySelectionHandler(selectedCat.categoryId, selectedCat)}>{selectedCat.categoryName}</td>
//                             </tr>

//                         })
//                         }
//                     </tbody>
//                 </table>

//             </div >
//             )}
//         </>
//     )
// }

// export default SelectedCoupns;