import { styled } from "@mui/system";

export const FieldError = styled('p')({
  color: "#b32e2e",
  margin:"0",
  padding:"0",
  fontSize: "11px",
  minHeight: "18px"
});

export const FieldContainer = styled('div')({
  margin:"0",
  padding:"0",
  width: "100%",
  gridColumn:"span 4",
  display: "flex",
  flexDirection: "column",
})


// export const FormSuccess = styled.span`
//   color: #28a828;
//   font-size: 12px;
//   min-height: 20px;
//   font-weight: 600;
// `;

// export const FormError = styled.span`
//   color: #b32e2e;
//   font-size: 12px;
//   min-height: 20px;
//   font-weight: 600;
// `;