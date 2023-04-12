// import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
// import {
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import { Menu } from '@mui/icons-material';
//
// // makeStyles is deprecated
//
// const useStyles = makeStyles((theme) => ({
//   list: {
//     width: 250,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
// }));
//
// const HamburgerMenu = () => {
//   const classes = useStyles();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//
//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setDrawerOpen(open);
//   };
//   // convert to ListItemButton since this is deprecated
//   const list = () => (
//     <div
//       className={classes.list}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {["Item 1", "Item 2", "Item 3"].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <Menu /> : <Menu />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
//
//   return (
//     <div>
//       <IconButton
//         edge="start"
//         className={classes.menuButton}
//         color="inherit"
//         aria-label="menu"
//         onClick={toggleDrawer(true)}
//       >
//         <Menu />
//       </IconButton>
//       <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//         {list()}
//       </Drawer>
//     </div>
//   );
// };
//
// export default HamburgerMenu;
