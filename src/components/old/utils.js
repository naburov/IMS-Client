const filenames = [
    '36444280',
    '36444294',
    '36444308',
    '36444322',
    '36444336',
    '36444350',
    '36444364',
    '36444378',
    '36444392',
    '36444406',
    '36444434',
    '36444448',
    '36444462',
    '36444476',
    '36444490',
    '36444504',
    '36444518',
    '36444532',
    '36746856',
  ];
  
  // export const files = filenames.map(filename => {
  //   return `https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/${filename}`;
  // });
  const studyId='2.16.840.1.113669.632.10.20191124.172214949.232479.27500';
  const seriesID='2.16.840.1.113669.632.10.20191124.171741192.232479';
  const instanceID = '2.16.840.1.113669.632.10.20191124.171741193.11876.43'

  export const file=`http://localhost:8042/instances/5b271e9f-c5e95a0d-c5d4e34a-cf0cd1d8-04526779/file`

  export const colors = {
    red: 0xff0000,
    blue: 0x0000ff,
    darkGrey: 0x353535,
  };