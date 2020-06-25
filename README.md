<Uploader
            multiple
            autoUpload={false}
            draggable
            name='files'
            accept='image/jpeg, image/png, image/jpg'
            onChange={setImages}
            listType='picture'
        >
	        <p style={{ padding: '40px 0' }}>
	            Drag or Select Files
	        </p>
        </Uploader>
        <Button
            onClick={() => {
                // setMessageSubmiting(true)
                
            }}
            appearance='primary'
        >
            Send
        </Button>
        <Button
            onClick={() => {
                setImages([]);
                
            }}
            appearance='subtle'

        >
            Cancel
        </Button>