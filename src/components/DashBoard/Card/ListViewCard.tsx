import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "../../../../styles/Home.module.css";
import Link from "next/link";
import firebase from "firebase/app";
import { useAuth } from "../../../contexts/auth";
import client from "../../../firebase/client";
import { firestore } from "firebase-admin";

export default function ListItem(props) {
  // console.log("card",props)
  // @ts-ignore
  const { user } = useAuth();

  // ================================
  // useEffect(()=>{
  //   client();
  //   const createDb = async()=>{
  //     if(user)
  //     {
  //       console.log(await firebase.firestore().collection("users").doc(user.uid).get());
  //       await firebase.firestore().collection("users").doc(user.uid).set({
  //       wishlist: [],
  //       collection: ["pasta sauce"],
  //       rdBooks: []
  //   })}
  //   }
  //   createDb();
  // }, [user]);

  useEffect(() => {
    client();
    const createDb = async () => {
      if (user) {
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid);
        if ((await userDoc.get()).exists) {
          //  let data = (await userDoc.get()).data());
        } else {
          userDoc.set({
            wishlist: [],
            collection: [],
            rdBooks: [],
          });
        }
      }
    };
    createDb();
  }, [user]);

  const addToWishlist = async () => {
    if (user)
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          wishlist: firebase.firestore.FieldValue.arrayUnion(props.book),
        });
  };

  const clickWishlistHandler = () => {
    addToWishlist();
  };

  const authorName = (author) => {
    let authorString = "";
    author.forEach((author) => {
      if (author.split(", ").length > 1) {
        let authorList = author.split(" ");
        authorString += authorList[1] + " " + authorList[0] + " ";
      }
    });
    if (authorString != "") {
      // if (authorString.length > 25)
      //   return authorString.substring(0, 25) + "...";
      return authorString.substring(0, authorString.length - 2);
    }
    // if (author.join(", ").length > 25)
    //   return author.join(", ").substring(0, 25) + "...";
    return author.join(", ");
  };

  // ================================

  return (
    <div
      className="border rounded-lg bg-white flex flex-row justify-between pt-1 mb-4"
      style={{ maxWidth: "100%", margin: "0" }}
    >
      <Col md={3} className="myrespd" style={{ paddingLeft: "0" }}>
        <Link href={`/books/${props.isbn}`}>
          <img
            src={props.image}
            alt=""
            className="bg-gray-100 rounded-lg myrespil"
          />
        </Link>
      </Col>
      <div className="m-auto myrespp">
        <div>
          <Link href={`/books/${props.isbn}`}>
            <button className="btn-cust-black w-full text-black-500 hover:text-green-500">
              {/* <h2 className="text-base text-black mb-0.5 mx-auto"> */}
              {props.title}
              {/* </h2> */}
            </button>
          </Link>

          <div className="flex flex-wrap text-sm font-medium whitespace-pre flex-col">
            <p className="my-1" style={{ textAlign: "center" }}>
              {props.description}
            </p>
            <p className="my-1" style={{ textAlign: "center" }}>
              {props.author ? authorName(props.author) : ""} | <br />
              {props.language} | {(props.date + "").substring(0, 4)} |{" "}
              {props.isbn} | <br />
              {props.binding}
            </p>
          </div>
        </div>
        <div>
          {}
          <Link href={`/books/${props.isbn}`}>
            <button className="btn-cust-green w-full text-green-500 hover:text-purple-500">
              View Book
            </button>
          </Link>
          {/* <button
            className="btn-cust-gray w-full"
            onClick={clickWishlistHandler}
          >
            Add to Wishlist
          </button> */}
        </div>
      </div>
    </div>
  );
}
