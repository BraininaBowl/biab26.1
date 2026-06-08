import { cloneVNode } from "vue";

export default function (string) {
  let boldOn = false;
  let italicOn = false;
  let header1On = false;
  let header2On = false;
  let header3On = false;
  let header4On = false;
  let header5On = false;
  let header6On = false;
  let paragOn = false;

  function closePrevious() {
    let toReturn = " ";
    if (boldOn) {
      toReturn += "</b> ";
      boldOn = false;
    }
    if (italicOn) {
      toReturn += "</i> ";
      italicOn = false;
    }
    if (header1On) {
      toReturn += "</h1> ";
      header1On = false;
    }
    if (header2On) {
      toReturn += "</h2> ";
      header2On = false;
    }
    if (header3On) {
      toReturn += "</h3> ";
      header3On = false;
    }
    if (header4On) {
      toReturn += "</h4> ";
      header4On = false;
    }
    if (header5On) {
      toReturn += "</h5> ";
      header5On = false;
    }
    if (header6On) {
      toReturn += "</h6> ";
      header6On = false;
    }
    if (paragOn) {
      toReturn += "</p> ";
      paragOn = false;
    }
    return toReturn;
  }

  const sections = string.split(/\s+/);
  if (
    ["#", "##", "###", "####", "#####", "######", "#p"].includes(sections[0]) ==
    false
  ) {
    sections.unshift("#p");
  }
  sections.forEach((section, index) => {
    if (section.startsWith("http://") || section.startsWith("https://")) {
      sections[index] =
        `<a href="${section}" target="_blank" rel="noopener noreferrer">${section}</a>`;
    }

    if (section == "/n") {
      sections[index] = "<br>";
    }

    if (section == "*") {
      if (italicOn) {
        sections[index] = "</i>";
        italicOn = false;
      } else {
        sections[index] = "<i>";
        italicOn = true;
      }
    }
    if (section == "**") {
      if (boldOn) {
        sections[index] = "</b>";
        boldOn = false;
      } else {
        sections[index] = "<b>";
        boldOn = true;
      }
    }

    if (section == "#") {
        sections[index] = closePrevious() + "<h1>";
        header1On = true;
    }
    if (section == "##") {
        sections[index] = closePrevious() + "<h2>";
        header2On = true;
    }
    if (section == "###") {
        sections[index] = closePrevious() + "<h3>";
        header3On = true;
    }
    if (section == "####") {
        sections[index] = closePrevious() + "<h4>";
        header4On = true;
    }
    if (section == "#####") {
        sections[index] = closePrevious() + "<h5>";
        header5On = true;
    }
    if (section == "######") {
        sections[index] = closePrevious() + "<h6>";
        header6On = true;
    }
    if (section == "#p") {
        sections[index] = closePrevious() + "<p>";
        paragOn = true;
    }
  });
  sections.push("" + closePrevious());
  return sections.join(" ");
}
