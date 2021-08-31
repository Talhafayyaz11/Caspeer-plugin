const getContent = (result, caseId) => {
  Office.context.mailbox.displayNewMessageForm({
    // toRecipients: Office.context.mailbox.item.to,
    bccRecipients: [`${caseId}@bcc.casepeer.com`],
    subject: Office.context.mailbox.item.subject,
    htmlBody: result.value,
    attachments: []
  });
};

export const displayMessageComposer = caseId => {
  Office.context.mailbox.item.body.getAsync(
    Office.CoercionType.Html,
    { asyncContext: "This is passed to the callback" },
    result => getContent(result, caseId)
  );
};

export const onOpenCase = url => {
  Office.context.ui.displayDialogAsync(url);
};

export const formatDate = doi => {
  let date = new Date(doi);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  return month + "-" + day + "-" + year;
};
